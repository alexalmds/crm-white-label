// pages/index.tsx
'use client';
import { Button, Link, Navbar, Card, Divider, CardHeader, CardBody, CardFooter, NavbarContent, NavbarBrand } from '@nextui-org/react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import image from '../assets/comercial-brand.png'
import usaFlag from '../assets/usa-flag.png'
import brazilFlag from '../assets/flag-brasil.png';
import spainFlag from '../assets/spain-flag.png';
import starFilled from '../assets/star-filled.svg'
import heroImage from '../assets/hero-image.png'
import iaAutomation from '../assets/ia-automation.jpg';
import crmFinancial from '../assets/crm-financial.jpg';
import { AiOutlineWhatsApp } from 'react-icons/ai'; // Ícone do WhatsApp
import basicPlan from '../assets/basic-plan.png';
import professionalPlan from '../assets/professional-plan.png';
import enterprisePlan from '../assets/enterprise-plan.png';
import brand1 from '../assets/brand1.png';
import brand2 from '../assets/brand2.png';
import brand4 from '../assets/brand4.png';
import brand3 from '../assets/brand3.png';
import brand5 from '../assets/brand5.png';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

type Lang = 'pt' | 'en' | 'es';

const HomePage = () => {
  const [lang, setLang] = useState<Lang>('pt');
  const [clientesCount, setClientesCount] = useState(0);
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Efeito de contagem dos clientes
  useEffect(() => {
    let count = 0;
    const interval = setInterval(() => {
      if (count < 35) {
        setClientesCount(count + 1);
        count++;
      } else {
        clearInterval(interval);
      }
    }, 75); // Aumentando o número a cada 50ms

    return () => clearInterval(interval);
  }, []);

  const handleLogin = () => {
    router.push("/login")
  }

  const translations: Record<Lang, { [key: string]: any }> = {
    pt: {
      header: {
        prices: 'Preços',
        sales: 'Fale com Vendas',
        access: 'Acesso',
        support: 'Suporte',
      },
      hero: 'O CRM Financeiro que sua empresa precisa.',
      description: 'Automatize suas cobranças, gerencie clientes e impulsione suas vendas com o FinSolve.',
      clients: `Já temos ${clientesCount}+ empresas usando FinSolve para seus negócios.`,
      pricing: 'Planos e Preços',
      pricingDescription: 'Escolha o plano ideal para seu negócio.',
      testimonials: 'O que nossos clientes dizem',
      controle_financeiro: 'O FinSolve permite controle financeiro, CRM completo e integração com diferentes sistemas.',
      ia_automation: 'Automatização de IA para cobranças, atendimento, negociações e geração de 2ª vias e pagamentos.',
      title_ia: 'Automatização de IA',
      title_controlcrm: 'Controle Financeiro'
    },
    en: {
      header: {
        prices: 'Pricing',
        sales: 'Contact Sales',
        access: 'Login',
        support: 'Support',
      },
      hero: 'The Financial CRM your business needs.',
      description: 'Automate billing, manage clients, and boost your sales with FinSolve.',
      clients: `We have ${clientesCount}+ businesses using FinSolve for their operations.`,
      pricing: 'Plans and Pricing',
      pricingDescription: 'Choose the perfect plan for your business.',
      testimonials: 'What our clients say',
      controle_financeiro: "FinSolve allows financial control, complete CRM, and integration with different systems.",
      ia_automation: "AI automation for collections, customer service, negotiations, and generation of second copies and payments.",
      title_ia: "AI Automation",
      title_controlcrm: "Financial Control"
    },
    es: {
      header: {
        prices: 'Precios',
        sales: 'Contactar Ventas',
        access: 'Acceso',
        support: 'Soporte',
      },
      hero: 'El CRM Financiero que necesita tu empresa.',
      description: 'Automatiza tus cobros, gestiona clientes y potencia tus ventas con FinSolve.',
      clients: `Ya tíemos ${clientesCount}+ empresas usando FinSolve para sus negocios.`,
      pricing: 'Planes y Precios',
      pricingDescription: 'Elija el plan ideal para su negocio.',
      testimonials: 'Lo que dicen nuestros clientes',
      controle_financeiro: "FinSolve permite control financiero, CRM completo e integración con diferentes sistemas.",
      ia_automation: "Automatización de IA para cobros, atención al cliente, negociaciones y generación de segundas copias y pagos.",
      title_ia: "Automatización de IA",
      title_controlcrm: "Control Financiero"
    },
  };
  
  const t = translations[lang];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header/Navbar */}
      {/* Banner do topo */}
      <div className="bg-red-500 text-white text-center py-2 flex justify-center items-center">
        <span className="font-bold">Aproveite o teste grátis de 7 dias do FinSolve 🎉</span>
        <Button className="ml-4 px-8 py-2 bg-white text-red-600 border-2 border-white hover:bg-red-600 hover:text-white" href="#trial">
          Iniciar avaliação
        </Button>
      </div>
      <Navbar isBordered className='flex justify-around'>
        <div>
          <NavbarBrand>
            <Image src={image} alt='logo' className='w-14 h-14'></Image>
          </NavbarBrand>
        </div>
        <div>
          <NavbarContent className='space-x-4 mr-10'>
            <Link className="text-zinc-700" href="#pricing">{t.header.prices}</Link>
            <Link className="text-zinc-700" href="#sales">{t.header.sales}</Link>
            <Link className="text-zinc-700" href="#support">{t.header.support}</Link>
            <Button onClick={() => handleLogin()} className="relative overflow-visible rounded-full hover:-translate-y-1 px-12 shadow-xl bg-gradient-to-r from-red-400 to-red-600 after:content-[''] after:absolute after:rounded-full after:inset-0 after:bg-background/40 after:z-[-1] after:transition after:!duration-500 hover:after:scale-150 hover:after:opacity-0 text-white" href="#pricing">
              {t.header.access}
            </Button>
          </NavbarContent>
        </div>
        <div>
          <NavbarContent>
            <div className="flex items-center">
              <Image src={brazilFlag} alt="PT" width={24} height={16} onClick={() => setLang('pt')} className="cursor-pointer mr-2" />
              <Image src={usaFlag} alt="EN" width={24} height={16} onClick={() => setLang('en')} className="cursor-pointer mr-2" />
              <Image src={spainFlag} alt="ES" width={24} height={16} onClick={() => setLang('es')} className="cursor-pointer" />
            </div>
          </NavbarContent>
        </div>

      </Navbar>

      {/* Hero Section */}
      <div className="flex text-center p-10 bg-slate-900 text-white justify-around items-center">
        {/* Texto de Chamada */}
        <div className="max-w-md">
          <h1 className="text-4xl font-bold">{t.hero}</h1>
          <p className="mt-5">{t.description}</p>
          <Button className="text-white font-semibold relative overflow-visible rounded-full hover:-translate-y-1 px-12 shadow-xl bg-gradient-to-r from-red-600 to-red-800 after:content-[''] after:absolute after:rounded-full after:inset-0 after:bg-background/40 after:z-[-1] after:transition after:!duration-500 hover:after:scale-150 hover:after:opacity-0 mt-4" href="#pricing" variant='light'>
            {t.header.prices}
          </Button>
        </div>
        <div>
          <Image src={heroImage} alt='image-hero' className='w-64 h-64'></Image>
        </div>

        {/* Formulário de Contato */}
        <div className="w-full max-w-md bg-white/30 backdrop-blur-md shadow-xl p-8 rounded-lg text-left border border-gray-300">
          <h2 className="text-2xl font-bold mb-6 text-slate-900">Entre em contato</h2>
          <form className="space-y-4">
            {/* Nome completo */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-slate-700">Nome completo</label>
              <input
                type="text"
                id="fullName"
                className="w-full p-3 mt-1 bg-white/50 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 placeholder:text-slate-400 placeholder:opacity-100"
                placeholder="Seu nome completo"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email</label>
              <input
                type="email"
                id="email"
                className="w-full p-3 mt-1 bg-white/50 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 placeholder:text-slate-400 placeholder:opacity-100"
                placeholder="Seu email"
              />
            </div>

            {/* Telefone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-slate-700">Telefone</label>
              <input
                type="tel"
                id="phone"
                className="w-full p-3 mt-1 bg-white/50 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 placeholder:text-slate-400 placeholder:opacity-100"
                placeholder="(XX) XXXX-XXXX"
              />
            </div>

            {/* Mensagem */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-700">Mensagem</label>
              <textarea
                id="message"
                rows={4}
                className="w-full p-3 mt-1 bg-white/50 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 placeholder:text-slate-400 placeholder:opacity-100"
                placeholder="Escreva sua mensagem"
              />
            </div>

            {/* Botão de Enviar */}
            <Button
              className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full shadow-lg py-3 hover:bg-gradient-to-r hover:from-red-600 hover:to-red-800 animate-pulse"
              style={{ animation: 'pulse 2s infinite' }} // Adiciona animação de piscar
            >
              Enviar
            </Button>
          </form>
        </div>

        <style jsx>{`
  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }
`}</style>

      </div>

      {/* Section de Clientes */}
      <div className="flex p-10 text-center bg-white items-center justify-around border-t-red-600 border-t-large">
        <div className='border-b-small border-b-gray-200'>
          <h3 className="text-red-700 text-2xl font-bold">{t.clients}</h3>
        </div>
      </div>
      <div className="p-10 bg-gray-200 text-center shadow-xl">
        <h2 className="text-3xl font-bold text-slate-900 mb-8">Nossas Marcas Clientes</h2>
        <div
          className={`flex overflow-hidden space-x-10 justify-center items-center ${isHovered ? '' : 'animate-scroll'
            }`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Imagens das marcas */}
          <div className="flex space-x-10">
            <Image
              src={brand4}
              alt="Brand 1"
              width={200}
              height={120}
              className="transition duration-500 ease-in-out filter grayscale hover:grayscale-0"
            />
            <Image
              src={brand2}
              alt="Brand 2"
              width={200}
              height={120}
              className="transition duration-500 ease-in-out filter grayscale hover:grayscale-0"
            />
            <Image
              src={brand5}
              alt="Brand 3"
              width={200}
              height={120}
              className="transition duration-500 ease-in-out filter grayscale hover:grayscale-0"
            />
            <Image
              src={brand3}
              alt="Brand 4"
              width={200}
              height={120}
              className="transition duration-500 ease-in-out filter grayscale hover:grayscale-0"
            />
            <Image
              src={brand1}
              alt="Brand 5"
              width={200}
              height={120}
              className="transition duration-500 ease-in-out filter grayscale hover:grayscale-0"
            />

          </div>
        </div>
      </div>

      {/* Seção Porque Somos os Melhores */}
      <div className="p-10 bg-white text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-8">Por que somos os melhores?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 justify-center">
          {/* Card Automatização de IA */}
          <Card className="flex bg-white bg-opacity-30 shadow-lg backdrop-blur-lg p-6 justify-center">
            <CardHeader className='flex justify-center'>
              <Image src={iaAutomation} alt="Automatização de IA" width={300} height={150} className="rounded-lg" />
            </CardHeader>
            <CardBody>
              <h4 className="text-xl font-bold text-slate-900">{t.title_ia}</h4>
              <p className="mt-2 text-slate-700">
                {t.ia_automation}
              </p>
            </CardBody>
            <CardFooter className="flex justify-center">
              <Button className="relative overflow-visible rounded-full hover:-translate-y-1 px-12 shadow-xl bg-gradient-to-r from-red-400 to-red-600 text-white">
                Iniciar Avaliação
              </Button>
            </CardFooter>
          </Card>

          {/* Card Controle Financeiro */}
          <Card className="bg-white bg-opacity-30 shadow-lg backdrop-blur-lg p-6">
            <CardHeader className='flex justify-center'>
              <Image src={crmFinancial} alt="Controle Financeiro" width={300} height={150} className="rounded-lg" />
            </CardHeader>
            <CardBody>
              <h4 className="text-xl font-bold text-slate-900">{t.title_controlcrm}</h4>
              <p className="mt-2 text-slate-700">
                {t.controle_financeiro}
              </p>
            </CardBody>
            <CardFooter className="flex justify-center">
              <Button className="relative overflow-visible rounded-full hover:-translate-y-1 px-12 shadow-xl bg-gradient-to-r from-red-400 to-red-600 text-white">
                Iniciar Avaliação
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>


      {/* Pricing Section */}
      <div id="pricing" className="p-10 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold">{t.pricing}</h2>
        <p className="mb-10">{t.pricingDescription}</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">

          {/* Basic Plan */}
          <Card className=" bg-white shadow-lg">
            <CardHeader className='flex justify-center'>
              <Image src={basicPlan} alt='basic-plan' width={150} height={150}></Image>
            </CardHeader>
            <CardBody>
              <p className='text-center font-semibold text-zinc-600 text-md'>Ideal para pequenas empresas</p>
              <p className="text-2xl font-bold mt-4 mb-4 text-center">R$ 79,99/mês</p>
              <div className='flex flex-col justify-center space-y-4 mb-8'>
                <Button className="ml-4 px-8 py-2 bg-white text-red-600 border-2 border-red-600 hover:bg-red-600 hover:text-white hover:font-semibold" href="#trial">
                  Iniciar avaliação gratuita**
                </Button>
                <Button className="text-lg underline ml-4 px-8 py-2 bg-white text-red-600 border-2 hover:bg-red-600 hover:text-white hover:font-semibold" href="#trial">
                  Comprar agora →
                </Button>
              </div>
              <ul className="text-left mt-4 space-y-2">
                <li>• Dashboard Básico</li>
                <li>• 1 User-agent para atendimento</li>
                <li>• 1 Número para atendimento com IA</li>
                <li>• 2GB para armazenamento de documentos</li>
                <li>• Suporte 24/7 via e-mail/ticket</li>
                <li>• Cadastros de até 5 usuários para gerenciamento de atendimentos</li>
              </ul>
              <p className="text-sm mt-4 text-gray-500">* Após 6 meses, R$ 129,99/mês (Cobrado anualmente)</p>
              <p className="text-sm mt-2 text-gray-500">+ R$ 1.000 de setup (Cobrado pela primeira vez)</p>
            </CardBody>
            <CardFooter>
              <p className='text-sm font-light'>**Necessário confirmação de identidade.</p>
            </CardFooter>
          </Card>

          {/* Professional Plan */}
          <Card className="bg-white shadow-lg relative">
            <span className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-bl-lg">
              Mais Utilizado
            </span>
            <CardHeader className='flex justify-center'>
              <Image src={professionalPlan} alt='professional-plan' width={150} height={150}></Image>
            </CardHeader>
            <CardBody>
              <p className='text-center font-semibold text-zinc-600 text-md'>Para equipes em crescimento</p>
              <p className="text-2xl font-bold mt-4 mb-4 text-center">R$ 249,99/mês</p>
              <div className='flex flex-col justify-center space-y-4 mb-8'>
                <Button className="ml-4 px-8 py-2 bg-white text-red-600 border-2 border-red-600 hover:bg-red-600 hover:text-white hover:font-semibold" href="#trial">
                  Iniciar avaliação gratuita**
                </Button>
                <Button className="text-lg underline ml-4 px-8 py-2 bg-white text-red-600 border-2 hover:bg-red-600 hover:text-white hover:font-semibold" href="#trial">
                  Comprar agora →
                </Button>
              </div>

              <ul className="text-left mt-4 space-y-2">
                <li>• Dashboard avançado</li>
                <li>• Até 5 User-Agents</li>
                <li>• Até 5 Números virtuais para atendimento simultâneo</li>
                <li>• Espaço em Núvem para armazenamento de 20GB</li>
                <li>• Criação de até 15 usuários</li>
              </ul>
              <p className="text-sm mt-4 text-gray-500">* Após 6 meses, R$ 425,99/mês (Cobrado anualmente)</p>
              <p className="text-sm mt-2 text-gray-500">+ R$ 500 de setup (Cobrado pela primeira vez)</p>
            </CardBody>
            <CardFooter>
              <p className='text-sm font-light'>**Necessário confirmação de identidade.</p>
            </CardFooter>
          </Card>

          {/* Enterprise Plan */}
          <Card className="bg-white shadow-lg">
            <CardHeader className='flex justify-center'>
              <Image src={enterprisePlan} alt='enterprise-plan' width={150} height={150}></Image>
            </CardHeader>
            <CardBody>
              <p className='text-center font-semibold text-zinc-600 text-md'>Para grandes empresas</p>
              <p className="text-2xl font-bold mt-4 mb-4 text-center">Sob-medida</p>
              <Button className="mb-24 ml-4 px-8 py-2 bg-white text-red-600 border-2 border-red-600 hover:bg-red-600 hover:text-white hover:font-semibold" href="#trial">
                Falar com um consultor
              </Button>
              <ul className="text-left mt-4 space-y-2">
                <li>• Plano personalizado para grandes volumes</li>
                <li>• Suporte dedicado e 24/7</li>
                <li>• Integrações avançadas e armazenamento ilimitado</li>
              </ul>
            </CardBody>
          </Card>

        </div>
      </div>


      {/* Testimonials Section */}
      <div className="p-10 bg-white text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-8">{t.testimonials}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          <div className="p-6 shadow-lg rounded-lg bg-slate-100">
            <p className="text-sm text-slate-900">"O FinSolve mudou completamente a forma como gerenciamos nossas cobranças. Rápido e eficaz!"</p>
            <div className="flex justify-center mt-4">
              {[...Array(5)].map((_, index) => (
                <Image key={index} src={starFilled} alt="Star" width={24} height={24} />
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-2">– Empresa X</p>
          </div>
          <div className="p-6 shadow-lg rounded-lg bg-slate-100">
            <p className="text-sm text-slate-900">"Automação de ponta, nos fez economizar tempo e dinheiro!"</p>
            <div className="flex justify-center mt-4">
              {[...Array(5)].map((_, index) => (
                <Image key={index} src={starFilled} alt="Star" width={24} height={24} />
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-2">– Empresa Y</p>
          </div>
          <div className="p-6 shadow-lg rounded-lg bg-slate-100">
            <p className="text-sm text-slate-900">"O suporte e a equipe são fantásticos. Recomendo!"</p>
            <div className="flex justify-center mt-4">
              {[...Array(5)].map((_, index) => (
                <Image key={index} src={starFilled} alt="Star" width={24} height={24} />
              ))}
            </div>
            <p className="text-sm text-gray-500 mt-2">– Empresa Z</p>
          </div>
        </div>
      </div>

      {/* Brands Slider Section */}
      
      {/* Botão flutuante do WhatsApp */}
      <a
        href="https://wa.me/5534984177439?text=Ol%C3%A1%2C%20gostaria%20de%20conhecer%20mais%20sobre%20a%20ferramenta%20CRM%20da%20FinSolve"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 bg-green-500 text-white p-4 rounded-full shadow-lg animate-pulse after:content-[''] after:absolute after:inset-0 after:border-4 after:border-green-500 after:rounded-full after:opacity-50 after:animate-ping"
      >
        <AiOutlineWhatsApp size={32} />
      </a>

      {/* Footer Section */}
      <footer className="bg-slate-900 text-white py-10">
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">

          {/* About Us Section */}
          <div>
            <h4 className="text-xl font-bold mb-4">Sobre o FinSolve</h4>
            <p className="text-sm text-gray-400">
              O FinSolve é um CRM completo, projetado para otimizar seus processos de atendimento, negociações e controle financeiro com automação e IA de ponta.
            </p>
          </div>

          {/* Useful Links Section */}
          <div>
            <h4 className="text-xl font-bold mb-4">Links Úteis</h4>
            <ul className="space-y-2">
              <li>
                <a href="#pricing" className="text-gray-400 hover:text-white">Planos e Preços</a>
              </li>
              <li>
                <a href="/faq" className="text-gray-400 hover:text-white">Perguntas Frequentes</a>
              </li>
              <li>
                <a href="/support" className="text-gray-400 hover:text-white">Suporte</a>
              </li>
              <li>
                <a href="/privacy-policy" className="text-gray-400 hover:text-white">Política de Privacidade</a>
              </li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div>
            <h4 className="text-xl font-bold mb-4">Siga-nos</h4>
            <div className="flex justify-center sm:justify-start space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <FaFacebookF size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <FaTwitter size={24} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <FaLinkedinIn size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                <FaInstagram size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="mt-10 border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} FinSolve. Todos os direitos reservados.</p>
          <p>
            Desenvolvido com <span className="text-red-500">❤</span> pela equipe FinSolve.
          </p>
        </div>
      </footer>

    </div>
  );
};

export default HomePage;
