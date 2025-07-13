import { useState, useEffect, useCallback } from "react";
import { Input } from "../ui/input";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Star, Calendar, ArrowUpRight, Sparkles, Search, Filter, Tag, TrendingUp, X, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { userRoutes } from "../../constants";
import { ProjectType } from '../../types/user.type';
import { allProjects } from "../../api/user";

export default function ProjectsPage() {
  const [searchValue, setSearchValue] = useState('');
  const [debouncedSearchValue, setDebouncedSearchValue] = useState('');
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('newest');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const categories = ['Graphic & Design', 'Mobile', 'Marketing & Sales', 'Finance & Accounting', 'Video & Animation', 'AI/ML'];
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<ProjectType[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchValue(searchValue);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchValue]);

  useEffect(() => {
    const getAllProjects = async () => {
      try {
        const response = await allProjects();
        if (response.success && response.data?.projects) {
          setProjects(response.data.projects);
          setFilteredProjects(response.data.projects);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    getAllProjects();
  }, []);

  useEffect(() => {
    let filtered = [...projects];

    if (debouncedSearchValue) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(debouncedSearchValue.toLowerCase()) ||
        project.description.toLowerCase().includes(debouncedSearchValue.toLowerCase())
      );
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter(project =>
        selectedCategories.includes(project.category || 'Web App')
      );
    }
    
    switch (sortBy) {
      // case 'newest':
      //   filtered.sort((a, b) => new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime());
      //   break;
      // case 'oldest':
      //   filtered.sort((a, b) => new Date(a.createdAt || '').getTime() - new Date(b.createdAt || '').getTime());
      //   break;
      case 'name-az':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name-za':
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }

    setFilteredProjects(filtered);
  }, [projects, debouncedSearchValue, selectedCategories, selectedRatings, sortBy]);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const clearFilters = () => {
    setSearchValue('');
    setDebouncedSearchValue('');
    setSelectedRatings([]);
    setSelectedCategories([]);
    setSortBy('newest');
  };

  const handleViewClick = (project: ProjectType) => {
    navigate(userRoutes.PROJECT_DETAILS, { state: { project } });
  };

  const FilterSidebar = useCallback(({ isMobile = false }) => (
    <div className={`bg-white border border-gray-100 shadow-lg rounded-3xl overflow-hidden ${isMobile ? 'mx-4 mb-6' : ''}`}>
      <div className="p-4 border-b lg:p-6 bg-gradient-to-r from-emerald-50 to-emerald-100/50 border-emerald-100">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 lg:gap-3">
            <div className="p-1.5 lg:p-2 bg-emerald-100 rounded-lg lg:rounded-xl">
              <Filter className="w-4 h-4 lg:w-5 lg:h-5 text-emerald-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-800 lg:text-xl">Filters</h2>
          </div>
          {(selectedRatings.length > 0 || selectedCategories.length > 0 || debouncedSearchValue) && (
            <button 
              onClick={clearFilters}
              className="flex items-center gap-1 px-2 py-1 text-xs font-medium transition-all duration-200 rounded-lg lg:text-sm text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
            >
              <X className="w-3 h-3" />
              <span className="hidden sm:inline">Clear</span>
            </button>
          )}
        </div>
        
      </div>

      <div className="p-4 space-y-4 lg:p-6 lg:space-y-6">
        <div className="space-y-2 lg:space-y-3">
          <label className="flex items-center gap-2 text-xs font-semibold text-gray-700 lg:text-sm">
            <Search className="w-3 h-3 lg:w-4 lg:h-4 text-emerald-500" />
            Search Projects
          </label>
          <div className="relative group">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Type to search..."
              className="w-full px-3 py-2 text-xs placeholder-gray-400 transition-all duration-300 border border-gray-200 lg:px-4 lg:py-3 lg:text-sm bg-gray-50 rounded-xl lg:rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:bg-white"
              autoComplete="off"
            />
            <div className="absolute inset-0 transition-opacity duration-300 opacity-0 pointer-events-none rounded-xl lg:rounded-2xl bg-gradient-to-r from-emerald-500/10 to-blue-500/10 group-focus-within:opacity-100" />
          </div>
        </div>

        <div className="space-y-2 lg:space-y-3">
          <label className="flex items-center gap-2 text-xs font-semibold text-gray-700 lg:text-sm">
            <Tag className="w-3 h-3 lg:w-4 lg:h-4 text-emerald-500" />
            Categories
          </label>
          <div className="space-y-1.5 lg:space-y-2">
            {categories.map((category) => (
              <label key={category} className="flex items-center gap-2 cursor-pointer lg:gap-3 group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => toggleCategory(category)}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 lg:w-5 lg:h-5 rounded-md lg:rounded-lg border-2 transition-all duration-200 flex items-center justify-center ${
                    selectedCategories.includes(category)
                      ? 'bg-emerald-500 border-emerald-500'
                      : 'border-gray-300 group-hover:border-emerald-400'
                  }`}>
                    {selectedCategories.includes(category) && (
                      <svg className="w-2.5 h-2.5 lg:w-3 lg:h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className={`text-xs lg:text-sm transition-colors duration-200 ${
                  selectedCategories.includes(category) 
                    ? 'text-emerald-700 font-medium' 
                    : 'text-gray-600 group-hover:text-gray-800'
                }`}>
                  {category}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-2 lg:space-y-3">
          <label className="flex items-center gap-2 text-xs font-semibold text-gray-700 lg:text-sm">
            <TrendingUp className="w-3 h-3 lg:w-4 lg:h-4 text-emerald-500" />
            Sort By
          </label>
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 text-xs transition-all duration-300 border border-gray-200 appearance-none cursor-pointer lg:px-4 lg:py-3 lg:text-sm bg-gray-50 rounded-xl lg:rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:bg-white"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="rating-high">Highest Rated</option>
              <option value="rating-low">Lowest Rated</option>
              <option value="name-az">Name: A-Z</option>
              <option value="name-za">Name: Z-A</option>
            </select>
            <div className="absolute transform -translate-y-1/2 pointer-events-none right-2 lg:right-3 top-1/2">
              <svg className="w-4 h-4 text-gray-400 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <button className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold py-2.5 lg:py-3 px-4 lg:px-6 rounded-xl lg:rounded-2xl transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2 group text-xs lg:text-sm">
          <Filter className="w-3 h-3 transition-transform duration-300 lg:w-4 lg:h-4 group-hover:rotate-12" />
          Apply Filters
        </button>

      </div>
    </div>
  ), [searchValue, selectedCategories, sortBy, debouncedSearchValue, clearFilters, toggleCategory]);

  return (
    <div className="min-h-screen bg-white">
      <div className="p-4 border-b border-gray-200 lg:hidden">
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="flex items-center gap-2 px-4 py-2 transition-colors border bg-emerald-50 text-emerald-700 rounded-xl border-emerald-200 hover:bg-emerald-100"
        >
          <Menu className="w-4 h-4" />
          <span className="font-medium">Filters</span>
          {(selectedRatings.length > 0 || selectedCategories.length > 0 || debouncedSearchValue) && (
            <span className="px-2 py-0.5 bg-emerald-200 text-emerald-800 rounded-full text-xs font-medium">
              {selectedRatings.length + selectedCategories.length + (debouncedSearchValue ? 1 : 0)}
            </span>
          )}
        </button>
      </div>

      {showMobileFilters && (
        <div className="lg:hidden">
          <FilterSidebar isMobile={true} />
        </div>
      )}

      <div className="flex p-4 lg:p-6">
        <aside className="hidden w-1/5 pr-4 lg:block">
          <FilterSidebar />
        </aside>

        <main className="w-full lg:w-4/5">
          <div className="mb-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 lg:text-3xl">
                  Projects
                  <span className="ml-2 text-lg font-normal text-gray-500">
                    ({filteredProjects.length} {filteredProjects.length === 1 ? 'result' : 'results'})
                  </span>
                </h1>
                {(debouncedSearchValue || selectedCategories.length > 0 || selectedRatings.length > 0) && (
                  <p className="mt-1 text-sm text-gray-600">
                    {debouncedSearchValue && `Searching for "${debouncedSearchValue}"`}
                    {selectedCategories.length > 0 && ` • Categories: ${selectedCategories.join(', ')}`}
                    {selectedRatings.length > 0 && ` • Ratings: ${selectedRatings.join('+ stars, ')}+ stars`}
                  </p>
                )}
              </div>
            </div>
          </div>

          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProjects.map((project, index) => (
                <div
                  className="cursor-pointer group"
                  onClick={() => handleViewClick(project)}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative overflow-hidden transition-all duration-500 bg-white border border-gray-100 shadow-sm rounded-2xl lg:rounded-3xl hover:shadow-2xl hover:-translate-y-2 hover:border-emerald-200">
                    
                    <div className="absolute inset-0 z-10 transition-all duration-700 pointer-events-none bg-gradient-to-br from-emerald-50/0 via-emerald-50/0 to-emerald-100/0 group-hover:from-emerald-50/30 group-hover:via-emerald-50/10 group-hover:to-emerald-100/20" />
                    
                    <div className="relative overflow-hidden">
                      <img
                        src={typeof project.thumbnail === "string" ? project.thumbnail : "https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=800"}
                        alt={project.title}
                        className="object-cover w-full transition-all duration-700 h-36 lg:h-48 group-hover:scale-110"
                      />
                      
                      <div className="absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-t from-black/20 via-transparent to-transparent group-hover:opacity-100" />
                      
                      <div className="absolute z-20 top-3 lg:top-4 left-3 lg:left-4">
                        <span className="px-2 py-1 text-xs font-medium border rounded-full lg:px-3 text-emerald-700 bg-white/90 backdrop-blur-sm border-emerald-200/50">
                          {project.category || 'Web App'}
                        </span>
                      </div>

                      <div className="absolute z-20 transition-all duration-300 transform translate-y-2 opacity-0 top-3 lg:top-4 right-3 lg:right-4 group-hover:opacity-100 group-hover:translate-y-0">
                        <div className="flex items-center justify-center w-8 h-8 transition-colors rounded-full shadow-lg lg:w-10 lg:h-10 bg-white/90 backdrop-blur-sm hover:bg-white">
                          <ArrowUpRight className="w-4 h-4 text-gray-700 lg:w-5 lg:h-5" />
                        </div>
                      </div>
                    </div>

                    <div className="relative z-20 p-4 lg:p-6">
                      <h3 className="mb-2 text-lg font-semibold text-gray-900 transition-colors duration-300 lg:mb-3 lg:text-xl group-hover:text-emerald-700 line-clamp-1">
                        {project.title}
                      </h3>
                      
                      <p className="mb-4 text-xs leading-relaxed text-gray-600 lg:mb-6 lg:text-sm line-clamp-2">
                        {project.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-xs text-gray-500 lg:gap-2 lg:text-sm">
                          <Calendar className="w-3 h-3 lg:w-4 lg:h-4" />
                          <span>{project.deadline || 'Dec 2024'}</span>
                        </div>
                        
                        <div className="flex items-center gap-1 text-xs lg:text-sm text-amber-600">
                          <Star className="w-3 h-3 lg:w-4 lg:h-4 fill-amber-400 text-amber-400" />
                          <span className="font-medium">Featured</span>
                        </div>
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 w-full h-1 transition-transform duration-500 origin-left transform scale-x-0 bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 group-hover:scale-x-100" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="mb-2 text-lg font-medium text-gray-900">No projects found</h3>
              <p className="mb-4 text-gray-600">Try adjusting your search criteria or filters</p>
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-white transition-colors rounded-lg bg-emerald-500 hover:bg-emerald-600"
              >
                Clear all filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}