'use client'
import { useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // Importa os estilos do Quill
import { Button } from '@nextui-org/react'; // Importando o botão do NextUI
import Link from 'next/link';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function ModelosContrato() {
    const [content, setContent] = useState(''); // Estado para armazenar o conteúdo do contrato
    const [titulo, setTitulo] = useState(''); // Título do contrato

    const handleSave = async () => {
        if (!titulo || !content) {
            alert('Por favor, preencha o título e o conteúdo do contrato.');
            return;
        }

        // Envia os dados para o backend (ou API) para salvar no banco de dados
        try {
            const response = await fetch('/api/save-contrato', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ titulo, content }), // Dados a serem enviados
            });

            if (response.ok) {
                alert('Modelo de contrato salvo com sucesso!');
            } else {
                alert('Erro ao salvar o contrato.');
            }
        } catch (error) {
            console.error('Erro:', error);
        }
    };

    return (
        <div className="w-[90%] mx-auto mt-14 p-6 shadow-md rounded-md bg-white">
            <div className='flex justify-between'>
                <h1 className="text-2xl font-bold mb-4">Modelos de Contratos</h1>
                <Button variant='shadow' color='primary'><Link href="/modelos-contrato/todos-modelos">Ver todos os modelos</Link></Button>
            </div>

            <div className="mb-4">
                <label className="block text-lg font-medium">Título do Contrato</label>
                <input
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    className="w-full p-2 border rounded mt-2"
                    placeholder="Digite o título do contrato"
                />
            </div>

            <div className="mb-4">
                <label className="block text-lg font-medium">Conteúdo do Contrato</label>
                <ReactQuill
                    theme="snow"
                    value={content}
                    onChange={setContent} // Atualiza o conteúdo
                    modules={{
                        toolbar: [
                            [{ header: '1' }, { header: '2' }, { font: [] }],
                            [{ list: 'ordered' }, { list: 'bullet' }],
                            ['bold', 'italic', 'underline'],
                            ['link', 'blockquote', 'code-block'],
                            [{ align: [] }],
                            ['clean'],
                        ],
                    }}
                />
            </div>

            <Button onClick={handleSave} color="primary" >
                Salvar Modelo de Contrato
            </Button>
        </div>
    );
}
