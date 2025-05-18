import React from 'react';
import PropTypes from 'prop-types';
import { FaFilter, FaSearch, FaTimes } from 'react-icons/fa';
import Button from './Button';
import Input from './Input';
import Select from './Select';

export default function ThreadFilter({
  categories,
  selectedCategory,
  setSelectedCategory,
  searchKeyword,
  setSearchKeyword,
  resetFilters,
}) {
  const uniqueCategories = [...new Set(categories)];

  return (
    <div className="mb-6 bg-base-200 p-4 rounded-lg shadow-sm">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="">
          <div className="form-control">
            <div className="input-group flex gap-1">
              <Input
                type="text"
                placeholder="Cari thread..."
                className="input input-bordered w-full"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
              <Button className="btn-square">
                <FaSearch />
              </Button>
            </div>
          </div>
        </div>

        <div className="">
          <div className="form-control">
            <div className="input-group flex gap-1">
              <Select
                className="select select-bordered w-full"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                options={uniqueCategories}
                placeholder="Kategori"
                defaultOption={{ value: '', label: 'Semua' }}
              />
              <Button className="btn-square">
                <FaFilter />
              </Button>
            </div>
          </div>
        </div>

        {(selectedCategory || searchKeyword) && (
          <div className="flex items-center">
            <Button className="btn-outline btn-sm" onClick={resetFilters}>
              <FaTimes className="mr-1" /> Reset Filter
            </Button>
          </div>
        )}
      </div>

      {(selectedCategory || searchKeyword) && (
        <div className="mt-3 text-sm text-gray-500">
          {selectedCategory && (
            <span className="badge badge-primary mr-2">{selectedCategory}</span>
          )}
          {searchKeyword && <span>Mencari: &quot;{searchKeyword}&quot;</span>}
        </div>
      )}
    </div>
  );
}

ThreadFilter.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedCategory: PropTypes.string.isRequired,
  setSelectedCategory: PropTypes.func.isRequired,
  searchKeyword: PropTypes.string.isRequired,
  setSearchKeyword: PropTypes.func.isRequired,
  resetFilters: PropTypes.func.isRequired,
};
