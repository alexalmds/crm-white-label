function ContadorMain(){
    /**
     * Fazer a lógica mais pra frente
     */
    const data = {
        projetos: 1,
        fl_registrados: 4,
        reais_pagos: '150,92'
    }
    return (
        <div className="flex flex-wrap justify-around mb-16 shadow-md py-10">
            <div className="text-center bg-white">
              <h3 className="text-3xl font-bold ">{data.projetos}</h3>
              <p>Projetos Concluídos</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold text-blue-300">{data.fl_registrados}</h3>
              <p>FreeLancer's + Cadastrados</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold text-green-500">R$ {data.reais_pagos}</h3>
              <p>Pago Aos FL+</p>
            </div>
          </div>
    )
}

export default ContadorMain;