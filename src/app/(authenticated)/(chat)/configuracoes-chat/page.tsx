"use client";
import { useState, useEffect, useContext } from 'react';
import { Button, Input, Tabs, Tab } from '@nextui-org/react';
import Modal from '@/components/Modal';
import { UserContext } from '@/context/UserContext';
import DynamicTable from '@/components/DynamicTable.tsx';
import { makeRequest } from '../../../../../axios';

interface Intent {
    id: number;
    name: string;
    examples: string[];
}

export interface Pipeline {
    id: number;
    name: string;
    steps: string[];
}

const TrainingScreen = () => {
    const [intents, setIntents] = useState<Intent[]>([]);
    const [pipelines, setPipelines] = useState<Pipeline[]>([]);
    const [intentName, setIntentName] = useState('');
    const [intentExamples, setIntentExamples] = useState('');
    const [pipelineName, setPipelineName] = useState('');
    const [pipelineSteps, setPipelineSteps] = useState('');
    const [showDialog, setShowDialog] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');
    const [dialogType, setDialogType] = useState<'success' | 'error' | 'warning' | 'info'>('info');
    const { user } = useContext(UserContext);
    const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
    // Estados de edição
    const [editingIntent, setEditingIntent] = useState<Intent | null>(null);
    const [editingPipeline, setEditingPipeline] = useState<Pipeline | null>(null);
    const [intentToDelete, setIntentToDelete] = useState<Intent | null>(null);
    const [pipelineToDelete, setPipelineToDelete] = useState<Pipeline | null>(null);



    // Função para listar intenções
    const fetchIntents = async () => {
        try {
            const response = await makeRequest.post('/intents/list', { id_empresa: user?.id_empresa });
            setIntents(response.data);
        } catch (error) {
            setShowDialog(true);
            setDialogMessage("Houve um erro ao listar as intenções. " + error);
            setDialogType("error");
        }
    };

    // Função para listar pipelines
    const fetchPipelines = async () => {
        try {
            const response = await makeRequest.post('/pipelines/list', { id_empresa: user?.id_empresa });
            setPipelines(response.data);
        } catch (error) {
            setShowDialog(true);
            setDialogMessage("Houve um erro ao listar os pipelines. " + error);
            setDialogType("error");
        }
    };

    useEffect(() => {
        if (user?.id_empresa) {
            fetchIntents();
            fetchPipelines();
        }
    }, [user?.id_empresa]);

    const addIntent = async () => {
        if (intentName && intentExamples) {
            const newIntent: Intent = {
                id: Math.random(), // Você deve garantir que o ID seja gerado corretamente no backend
                name: intentName,
                examples: intentExamples.split(',').map(example => example.trim()),
            };
            try {
                const response = await makeRequest.post('/intents/create', { ...newIntent, id_empresa: user?.id_empresa });
                setIntentName('');
                setIntentExamples('');
                setShowDialog(true);
                setDialogMessage("Intenção adicionada com sucesso!");
                setDialogType("success");
                fetchIntents();
            } catch (error) {
                setShowDialog(true);
                setDialogMessage("Houve um erro ao adicionar a intenção. " + error);
                setDialogType("error");
            }
        }
    };

    const addPipeline = async () => {
        if (pipelineName && pipelineSteps) {
            const newPipeline: Pipeline = {
                id: Math.random(), // Você deve garantir que o ID seja gerado corretamente no backend
                name: pipelineName,
                steps: pipelineSteps.split(',').map(step => step.trim()),
            };
            try {
                const response = await makeRequest.post('/pipelines/create', { ...newPipeline, id_empresa: user?.id_empresa });
                setPipelineName('');
                setPipelineSteps('');
                setShowDialog(true);
                setDialogMessage("Pipeline adicionado com sucesso!");
                setDialogType("success");
                fetchPipelines();
            } catch (error) {
                setShowDialog(true);
                setDialogMessage("Houve um erro ao adicionar o pipeline. " + error);
                setDialogType("error");
            }
        }
    };


    // Funções de edição
    const handleEditIntent = (intent: Intent) => {
        setEditingIntent(intent);
        setIntentName(intent.name);
        const examplesArray = typeof intent.examples === 'string' ? JSON.parse(intent.examples) : [];
        setIntentExamples(examplesArray.join(', '));
    };

    const handleEditPipeline = (pipeline: Pipeline) => {
        setEditingPipeline(pipeline);
        setPipelineName(pipeline.name);
        const stepsArray = typeof pipeline.steps === 'string' ? JSON.parse(pipeline.steps) : [];
        setPipelineSteps(stepsArray.join(', '));
    };

    const saveIntentEdit = async () => {
        if (editingIntent) {
            const updatedIntent: Intent = {
                id: editingIntent.id, // Certifique-se de usar o ID do objeto original
                name: intentName,
                examples: intentExamples.split(',').map(example => example.trim()),
            };

            try {
                const response = await makeRequest.patch('/intents/update', {
                    ...updatedIntent,
                    id_empresa: user?.id_empresa
                });

                setShowDialog(true);
                setDialogMessage("Intenção atualizada com sucesso!");
                setDialogType("success");
                resetEditing();
                fetchIntents();
            } catch (error) {
                console.error(error); // Adicione um console.log para depuração
                setShowDialog(true);
                setDialogMessage("Houve um erro ao atualizar a intenção. " + error);
                setDialogType("error");
            }
        }
    };


    const savePipelineEdit = async () => {
        if (editingPipeline) {
            const updatedPipeline: Pipeline = {
                id: editingPipeline.id,
                name: pipelineName,
                steps: pipelineSteps.split(',').map(step => step.trim()),
            };
            try {
                const response = await makeRequest.patch('/pipelines/update', { ...updatedPipeline, id_empresa: user?.id_empresa });
                setShowDialog(true);
                setDialogMessage("Pipeline atualizado com sucesso!");
                setDialogType("success");
                resetEditing();
                fetchPipelines();
            } catch (error) {
                setShowDialog(true);
                setDialogMessage("Houve um erro ao atualizar o pipeline. " + error);
                setDialogType("error");
            }
        }
    };

    const resetEditing = () => {
        setEditingIntent(null);
        setEditingPipeline(null);
        setIntentName('');
        setIntentExamples('');
        setPipelineName('');
        setPipelineSteps('');
    };

    // Função para abrir modal de confirmação
    const confirmDeleteIntent = (intent: Intent) => {
        setIntentToDelete(intent);
        setIsConfirmDeleteOpen(true);
    };

    const confirmDeletePipeline = (pipeline: Pipeline) => {
        setPipelineToDelete(pipeline);
        setIsConfirmDeleteOpen(true);
    };

    const deleteIntent = async (id: number) => {
        try {
            await makeRequest.delete('/intents/delete', { data: { id: id } });
            setIntents(intents.filter(intent => intent.id !== id));
            setShowDialog(true);
            setDialogMessage("Intenção excluída com sucesso!");
            setDialogType("success");
        } catch (error) {
            setShowDialog(true);
            setDialogMessage("Houve um erro ao excluir a intenção. " + error);
            setDialogType("error");
        }
    };

    const deletePipeline = async (id: number) => {
        try {
            await makeRequest.delete('/pipelines/delete', { data: { id: id } });
            setPipelines(pipelines.filter(pipeline => pipeline.id !== id));
            setShowDialog(true);
            setDialogMessage("Pipeline excluído com sucesso!");
            setDialogType("success");
        } catch (error) {
            setShowDialog(true);
            setDialogMessage("Houve um erro ao excluir o pipeline. " + error);
            setDialogType("error");
        }
    };

    // Definindo as colunas da tabela
    const columnsIntents = [
        { uid: 'id', name: 'ID' },
        { uid: 'name', name: 'Nome' },
        { uid: 'examples', name: 'Exemplos' },
        {
            uid: 'actions',
            name: 'Ações',
            sortable: false
        },
    ];

    const columnsPipelines = [
        { uid: 'id', name: 'ID' },
        { uid: 'name', name: 'Nome' },
        { uid: 'steps', name: 'Passos' },
        {
            uid: 'actions',
            name: 'Ações',
            sortable: false
        },
    ];

    // Ajuste os dados para incluir ações
    const tableDataIntents = intents.map(intent => ({
        ...intent,
        actions: (
            <div className="flex space-x-2">
                <button
                    onClick={() => handleEditIntent(intent)} // Função não definida no código original
                    className="text-blue-600 hover:underline"
                >
                    Editar
                </button>
                <button
                    onClick={() => deleteIntent(intent.id)}
                    className="text-red-600 hover:underline"
                >
                    Excluir
                </button>
            </div>
        ),
    }));

    // Ajuste os dados para incluir ações
    const tableDataPipelines = pipelines.map(pipeline => ({
        ...pipeline,
        actions: (
            <div className="flex space-x-2">
                <button
                    onClick={() => handleEditPipeline(pipeline)} // Função não definida no código original
                    className="text-blue-600 hover:underline"
                >
                    Editar
                </button>
                <button
                    onClick={() => deletePipeline(pipeline.id)}
                    className="text-red-600 hover:underline"
                >
                    Excluir
                </button>
            </div>
        ),
    }));

    return (
        <div className="p-4 w-[90%] mt-11">
            <h2>Treinamento do Bot</h2>

            <Tabs>
                <Tab title="Intenções">
                    <div className="mb-4 space-y-2">
                        <Input
                            label="Nome da Intenção"
                            placeholder="Ex: saudacao"
                            value={intentName}
                            onChange={(e) => setIntentName(e.target.value)}
                        />
                        <Input
                            label="Exemplos (separados por vírgula)"
                            placeholder="Ex: Olá, Oi, Bom dia"
                            value={intentExamples}
                            onChange={(e) => setIntentExamples(e.target.value)}
                        />
                        
                        {editingIntent ? (
                            <div>
                                <Button onClick={saveIntentEdit} className="mt-2 mr-3" color='success'>Salvar Edição</Button>
                                <Button onClick={resetEditing} className="mt-2" color='danger' variant='flat'>Cancelar</Button>
                            </div>
                        ) : (
                            <Button onClick={addIntent} className="mt-2" color='primary'>Adicionar Intenção</Button>
                        )}
                    </div>

                    <h3>Intenções Adicionadas</h3>
                    <DynamicTable
                        columns={columnsIntents}
                        data={tableDataIntents}
                        onAddNew={addIntent} // Corrigido para a função de adicionar
                        statusColorMap={{
                            ativo: 'success',
                            inativo: 'danger',
                            pendente: 'warning',
                        }}
                        initialVisibleColumns={['id', 'name', 'examples', 'actions']}
                        rowsPerPageOptions={[5, 10, 15]}
                        actionItems={(item) => [
                            {
                                label: "Editar",
                                onClick: () => handleEditIntent(item),
                            },
                            {
                                label: "Excluir",
                                onClick: () => confirmDeleteIntent(item),
                            },
                        ]}
                    />
                </Tab>
                <Tab title="Pipelines">
                    <div className="mb-4 space-y-2">
                        <Input
                            label="Nome do Pipeline"
                            placeholder="Ex: Fluxo de Atendimento"
                            value={pipelineName}
                            onChange={(e) => setPipelineName(e.target.value)}
                        />
                        <Input
                            label="Passos do Pipeline (separados por vírgula)"
                            placeholder="Ex: Pergunta inicial, Resposta, Pergunta de seguimento"
                            value={pipelineSteps}
                            onChange={(e) => setPipelineSteps(e.target.value)}
                        />
                        {editingPipeline ? (
                            <div>
                                <Button onClick={savePipelineEdit} className="mt-2 mr-3" color='success'>Salvar Edição</Button>
                                <Button onClick={resetEditing} className="mt-2" color='danger' variant='flat'>Cancelar</Button>
                            </div>
                        ) : (
                            <Button onClick={addPipeline} className="mt-2" color='primary'>Adicionar Pipeline</Button>
                        )}
                    </div>

                    <h3>Pipelines Adicionados</h3>
                    <DynamicTable
                        columns={columnsPipelines}
                        data={tableDataPipelines}
                        onAddNew={addPipeline} // Corrigido para a função de adicionar
                        statusColorMap={{
                            ativo: 'success',
                            inativo: 'danger',
                            pendente: 'warning',
                        }}
                        initialVisibleColumns={['id', 'name', 'steps', 'actions']}
                        rowsPerPageOptions={[5, 10, 15]}
                        actionItems={(item) => [
                            {
                                label: "Editar",
                                onClick: () => handleEditPipeline(item),
                            },
                            {
                                label: "Excluir",
                                onClick: () => confirmDeletePipeline(item),
                            },
                        ]}
                    />
                </Tab>
            </Tabs>

            {isConfirmDeleteOpen && intentToDelete && (
                <Modal
                    showDialog={isConfirmDeleteOpen}
                    setShowDialog={setIsConfirmDeleteOpen}
                    titleDialog="Confirmação de Exclusão"
                    messageDialog={`Você tem certeza que deseja excluir o Intent: ${intentToDelete.name}?`}
                    type="warning"
                    onConfirm={() => {
                        const id = intentToDelete.id;
                        deleteIntent(id);
                        setIsConfirmDeleteOpen(false); // Fechar o modal após a confirmação
                    }}
                    typeDlg='question'
                />
            )}

            {isConfirmDeleteOpen && pipelineToDelete && (
                <Modal
                    showDialog={isConfirmDeleteOpen}
                    setShowDialog={setIsConfirmDeleteOpen}
                    titleDialog="Confirmação de Exclusão"
                    messageDialog={`Você tem certeza que deseja excluir o Pipeline: ${pipelineToDelete.name}?`}
                    type="warning"
                    onConfirm={() => {
                        const id = pipelineToDelete.id;
                        deletePipeline(id);
                        setIsConfirmDeleteOpen(false); // Fechar o modal após a confirmação
                    }}
                    typeDlg='question'
                />
            )}

            <Modal
                showDialog={showDialog}
                setShowDialog={setShowDialog}
                titleDialog={`${dialogType === 'error' ? "Houve um erro" : "Notificação"}`}
                messageDialog={dialogMessage}
                type={dialogType}
                typeDlg='message'
            />
        </div>
    );
};

export default TrainingScreen;