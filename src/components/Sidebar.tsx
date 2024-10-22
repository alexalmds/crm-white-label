import React, { useState } from 'react';

interface SidebarProps {
  onSearch: (query: string) => void;
  onFilterChange: (filters: any) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onSearch, onFilterChange }) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas as categorias');
  const [recentlyPublished, setRecentlyPublished] = useState('');
  const [plusOnly, setPlusOnly] = useState(false);
  const [professionalType, setProfessionalType] = useState('');
  const [tags, setTags] = useState('');
  const [clientRating, setClientRating] = useState('');

  const categories = [
    'Todas as categorias',
    'Administração & Contabilidade',
    'Advogados & Leis',
    'Atendimento ao Consumidor',
    'Design & Criação',
    'Educação & Consultoria',
    'Engenharia & Arquitetura',
    'Escrita',
    'Fotografia & AudioVisual',
    'Suporte Administrativo',
    'Tradução',
    'Vendas & Marketing',
    'Web, Mobile & Software',
  ];

  const professionalTypes = [
    'Iniciante',
    'Junior',
    'Pleno',
    'Senior',
    'Master',
    'Intermediario',
    'Avançado',
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    onSearch(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    onFilterChange({ category: e.target.value });
  };

  const handleRecentlyPublishedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecentlyPublished(e.target.value);
    onFilterChange({ recentlyPublished: e.target.value });
  };

  const handlePlusOnlyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlusOnly(e.target.checked);
    onFilterChange({ plusOnly: e.target.checked });
  };

  const handleProfessionalTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProfessionalType(e.target.value);
    onFilterChange({ professionalType: e.target.value });
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTags(e.target.value);
    onFilterChange({ tags: e.target.value });
  };


  return (
    <div className="w-1/3 max-h-[600px] p-4 bg-zinc-100 text-zinc-500 rounded-xl shadow-sm ">
      <h2 className="text-xl font-bold mb-4">Filtrar Projetos</h2>
      

      <div className="mb-4">
        <h3 className="font-bold">Categorias</h3>
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="w-full p-2 border rounded"
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <h3 className="font-bold">Publicado</h3>
        <div>
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="24h"
              checked={recentlyPublished === '24h'}
              onChange={handleRecentlyPublishedChange}
              className="form-radio"
            />
            <span className="ml-2">Menos de 24 horas</span>
          </label>
        </div>
        <div>
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="7d"
              checked={recentlyPublished === '7d'}
              onChange={handleRecentlyPublishedChange}
              className="form-radio"
            />
            <span className="ml-2">Menos de 7 dias</span>
          </label>
        </div>
      </div>

      <div className="mb-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={plusOnly}
            onChange={handlePlusOnlyChange}
            className="form-checkbox"
          />
          <span className="ml-2">Somente projetos para usuários Plus</span>
        </label>
      </div>

      <div className="mb-4">
        <h3 className="font-bold">Tipo de Profissional</h3>
        <select
          value={professionalType}
          onChange={handleProfessionalTypeChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Todos</option>
          {professionalTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <h3 className="font-bold">Tags</h3>
        <input
          type="text"
          value={tags}
          onChange={handleTagsChange}
          placeholder="Digite as tags"
          className="w-full p-2 border rounded"
        />
      </div>
    </div>
  );
};

export default Sidebar;
