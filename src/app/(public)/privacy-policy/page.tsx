'use client';
import { Button, Link, NavbarBrand, NavbarContent, Navbar } from '@nextui-org/react';
import Image from 'next/image';
import imageLogo from '../../../assets/comercial-brand.png'
import { useState } from 'react';

const PrivacyPolicyAndTermsOfUse = () => {
    const [language, setLanguage] = useState('pt');

    const handleLanguageChange = (lang: any) => {
        setLanguage(lang);
    };

    const content = {
        pt: {
            privacyPolicy: `
        **Política de Privacidade**
        
        A sua privacidade é importante para nós. É política do FinSolve respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site FinSolve, e outros sites que possuímos e operamos.

        Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado.

        Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados.

        Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei.

        O nosso site pode ter links para sites externos que não são operados por nós. Esteja ciente de que não temos controle sobre o conteúdo e práticas desses sites e não podemos aceitar responsabilidade por suas respectivas políticas de privacidade.

        Você é livre para recusar a nossa solicitação de informações pessoais, entendendo que talvez não possamos fornecer alguns dos serviços desejados.

        O uso continuado de nosso site será considerado como aceitação de nossas práticas em torno de privacidade e informações pessoais. Se você tiver alguma dúvida sobre como lidamos com dados do usuário e informações pessoais, entre em contacto connosco.

        O serviço Google AdSense que usamos para veicular publicidade usa um cookie DoubleClick para veicular anúncios mais relevantes em toda a Web e limitar o número de vezes que um determinado anúncio é exibido para você.

        Para mais informações sobre o Google AdSense, consulte as FAQs oficiais sobre privacidade do Google AdSense.

        Utilizamos anúncios para compensar os custos de funcionamento deste site e fornecer financiamento para futuros desenvolvimentos. Os cookies de publicidade comportamental usados por este site foram projetados para garantir que você forneça os anúncios mais relevantes sempre que possível, rastreando anonimamente seus interesses e apresentando coisas semelhantes que possam ser do seu interesse.

        Vários parceiros anunciam em nosso nome e os cookies de rastreamento de afiliados simplesmente nos permitem ver se nossos clientes acessaram o site através de um dos sites de nossos parceiros, para que possamos creditá-los adequadamente e, quando aplicável, permitir que nossos parceiros afiliados ofereçam qualquer promoção que pode fornecê-lo para fazer uma compra.

        **Compromisso do Usuário**
        
        O usuário se compromete a fazer uso adequado dos conteúdos e da informação que o FinSolve oferece no site e com caráter enunciativo, mas não limitativo:

        A) Não se envolver em atividades que sejam ilegais ou contrárias à boa fé a à ordem pública;
        B) Não difundir propaganda ou conteúdo de natureza racista, xenofóbica, 166bet ou azar, qualquer tipo de pornografia ilegal, de apologia ao terrorismo ou contra os direitos humanos;
        C) Não causar danos aos sistemas físicos (hardwares) e lógicos (softwares) do FinSolve, de seus fornecedores ou terceiros, para introduzir ou disseminar vírus informáticos ou quaisquer outros sistemas de hardware ou software que sejam capazes de causar danos anteriormente mencionados.

        **Mais informações**
        
        Esperemos que esteja esclarecido e, como mencionado anteriormente, se houver algo que você não tem certeza se precisa ou não, geralmente é mais seguro deixar os cookies ativados, caso interaja com um dos recursos que você usa em nosso site.

        Esta política é efetiva a partir de 4 de outubro de 2024.
      `,
            termsOfUse: `
        **Termos de Uso**

        1. **Termos**: Ao acessar o site FinSolve, você concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis.

        2. **Uso de Licença**: É concedida permissão para baixar temporariamente uma cópia dos materiais no site FinSolve, apenas para visualização pessoal e não comercial. Esta é a concessão de uma licença, não uma transferência de título.

        3. **Isenção de responsabilidade**: Os materiais no site da FinSolve são fornecidos 'como estão'. A FinSolve não oferece garantias, expressas ou implícitas, e nega todas as outras garantias.

        4. **Limitações**: Em nenhum caso o FinSolve ou seus fornecedores serão responsáveis por quaisquer danos decorrentes do uso ou da incapacidade de usar os materiais.

        5. **Precisão dos materiais**: Os materiais exibidos no site da FinSolve podem incluir erros técnicos ou tipográficos.

        6. **Links**: A FinSolve não se responsabiliza pelo conteúdo de nenhum site vinculado.

        7. **Modificações**: A FinSolve pode revisar estes termos de serviço a qualquer momento, sem aviso prévio.

        8. **Lei aplicável**: Estes termos são regidos pelas leis do FinSolve.
      `,
        },
        en: {
            privacyPolicy: `
        **Privacy Policy**
        
        Your privacy is important to us. It is FinSolve's policy to respect your privacy regarding any information we may collect on the FinSolve site, and other sites we own and operate.

        We ask for personal information only when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also inform you why we’re collecting it and how it will be used.

        We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use, or modification.

        We don’t share any personally identifying information publicly or with third parties, except when required to by law.

        Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites, and cannot accept responsibility for their respective privacy policies.

        You are free to refuse our request for your personal information, with the understanding that we may be unable to provide you with some of your desired services.

        Your continued use of our website will be regarded as acceptance of our practices around privacy and personal information. If you have any questions about how we handle user data and personal information, feel free to contact us.

        The Google AdSense service we use to serve advertising uses a DoubleClick cookie to serve more relevant ads across the web and limit the number of times a given ad is shown to you.

        For more information on Google AdSense, please see the official Google AdSense privacy FAQ.

        We use ads to offset the costs of running this site and provide funding for future developments. The behavioral advertising cookies used by this site are designed to ensure that you provide the most relevant ads wherever possible by anonymously tracking your interests and presenting similar things that may be of interest.

        Several partners advertise on our behalf and affiliate tracking cookies simply allow us to see if our customers have accessed the site through one of our partners' sites, so we can credit them appropriately and, where applicable, allow our affiliate partners to provide any promotions that may provide you to make a purchase.

        **User Commitment**
        
        The user undertakes to make appropriate use of the content and information that FinSolve offers on the site, including but not limited to:

        A) Not engaging in activities that are illegal or contrary to good faith and public order;
        B) Not disseminating propaganda or content of a racist, xenophobic nature, or gambling, pornography, terrorism apology, or human rights violations;
        C) Not causing damage to FinSolve's physical (hardware) and logical (software) systems, its suppliers, or third parties.

        **More Information**

        Hopefully, that clarifies things, and as mentioned earlier, if there is something that you aren't sure whether you need or not, it's usually safer to leave cookies enabled in case it interacts with one of the features you use on our site.

        This policy is effective as of October 4, 2024.
      `,
            termsOfUse: `
        **Terms of Use**

        1. **Terms**: By accessing the FinSolve website, you agree to comply with these terms of service, all applicable laws, and regulations.

        2. **Use License**: Permission is granted to temporarily download one copy of the materials on FinSolve's website for personal, non-commercial transitory viewing only.

        3. **Disclaimer**: The materials on FinSolve's website are provided on an 'as is' basis. FinSolve makes no warranties, expressed or implied.

        4. **Limitations**: In no event shall FinSolve or its suppliers be liable for any damages arising out of the use or inability to use the materials.

        5. **Accuracy of materials**: The materials appearing on FinSolve's website may include technical, typographical, or photographic errors.

        6. **Links**: FinSolve has not reviewed all of the sites linked to its website and is not responsible for the contents of any linked site.

        7. **Modifications**: FinSolve may revise these terms of service at any time without notice.

        8. **Governing Law**: These terms and conditions are governed by the laws of FinSolve.
      `,
        },
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <Navbar isBordered className='flex justify-around'>
                <div>
                    <NavbarBrand>
                        <Link href='/'>
                            <Image src={imageLogo} alt='logo' className='w-14 h-14'></Image>
                        </Link>
                    </NavbarBrand>
                </div>
                <div>
                    <NavbarContent className='space-x-4 mr-10'>
                        <Link className="text-zinc-700" href="/#pricing">Preços</Link>
                        <Link className="text-zinc-700" href="/">Fale com Vendas</Link>
                        <Link className="text-zinc-700" href="/customer/support">Suporte</Link>
                        <Button className="relative overflow-visible rounded-full hover:-translate-y-1 px-12 shadow-xl bg-gradient-to-r from-red-400 to-red-600 after:content-[''] after:absolute after:rounded-full after:inset-0 after:bg-background/40 after:z-[-1] after:transition after:!duration-500 hover:after:scale-150 hover:after:opacity-0 text-white" href="#pricing">
                            Acesso
                        </Button>
                    </NavbarContent>
                </div>
                <div>
                </div>

            </Navbar>
            <div className="container mx-auto px-4">
                <div className="flex justify-end mb-6">
                    <div className="space-x-4">
                        <button
                            onClick={() => handleLanguageChange('pt')}
                            className={`px-4 py-2 rounded-md text-white ${language === 'pt' ? 'bg-blue-600' : 'bg-gray-500'}`}
                        >
                            Português
                        </button>
                        <button
                            onClick={() => handleLanguageChange('en')}
                            className={`px-4 py-2 rounded-md text-white ${language === 'en' ? 'bg-blue-600' : 'bg-gray-500'}`}
                        >
                            English
                        </button>
                    </div>
                </div>

                <div className="bg-white shadow-lg rounded-lg p-8">
                    <h1 className="text-3xl font-semibold mb-6">
                        {language === 'pt' ? 'Política de Privacidade' : 'Privacy Policy'}
                    </h1>
                    <p className="text-gray-700 mb-8 leading-relaxed">
                        {language === 'pt' ? content.pt.privacyPolicy : content.en.privacyPolicy}
                    </p>

                    <h1 className="text-3xl font-semibold mb-6">
                        {language === 'pt' ? 'Termos de Uso' : 'Terms of Use'}
                    </h1>
                    <p className="text-gray-700 leading-relaxed">
                        {language === 'pt' ? content.pt.termsOfUse : content.en.termsOfUse}
                    </p>
                </div>
            </div>
        </div>

    );
};

export default PrivacyPolicyAndTermsOfUse;
