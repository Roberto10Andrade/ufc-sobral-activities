'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Activity } from '../types/Activity';
import { 
  CalendarIcon, 
  MapPinIcon, 
  UserIcon, 
  UserGroupIcon, 
  TagIcon, 
  DocumentTextIcon, 
  AcademicCapIcon, 
  CheckCircleIcon,
  PencilIcon,
  PlusIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

interface ActivityFormProps {
  onSubmit: (values: Activity) => void;
  initialValues?: Activity;
}

const ActivitySchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Título deve ter pelo menos 3 caracteres')
    .required('Título é obrigatório'),
  description: Yup.string()
    .min(10, 'Descrição deve ter pelo menos 10 caracteres')
    .required('Descrição é obrigatória'),
  type: Yup.string()
    .oneOf(['COURSE', 'WORKSHOP', 'SEMINAR', 'RESEARCH', 'EXTENSION', 'OTHER'], 'Tipo inválido')
    .required('Tipo é obrigatório'),
  status: Yup.string()
    .oneOf(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'], 'Status inválido')
    .required('Status é obrigatório'),
  startDate: Yup.date()
    .required('Data de início é obrigatória'),
  endDate: Yup.date()
    .min(Yup.ref('startDate'), 'Data de término deve ser posterior à data de início')
    .required('Data de término é obrigatória'),
  location: Yup.string()
    .required('Local é obrigatório'),
  coordinator: Yup.string()
    .required('Coordenador é obrigatório'),
  participants: Yup.number()
    .min(1, 'Deve haver pelo menos 1 participante')
    .required('Número de participantes é obrigatório'),
  tags: Yup.array()
    .of(Yup.string())
    .min(1, 'Adicione pelo menos uma tag')
    .required('Tags são obrigatórias'),
});

const getActivityTypeIcon = (type: Activity['type']) => {
  switch (type) {
    case 'COURSE':
      return '📚';
    case 'WORKSHOP':
      return '🛠️';
    case 'SEMINAR':
      return '🎯';
    case 'RESEARCH':
      return '🔬';
    case 'EXTENSION':
      return '🤝';
    default:
      return '📌';
  }
};

const getActivityTypeGradient = (type: Activity['type']) => {
  switch (type) {
    case 'COURSE':
      return 'from-blue-500 to-indigo-600';
    case 'WORKSHOP':
      return 'from-purple-500 to-violet-600';
    case 'SEMINAR':
      return 'from-emerald-500 to-teal-600';
    case 'RESEARCH':
      return 'from-amber-500 to-orange-600';
    case 'EXTENSION':
      return 'from-rose-500 to-pink-600';
    default:
      return 'from-gray-500 to-slate-600';
  }
};

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  icon: React.ReactNode;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  touched?: boolean;
}

const InputField = ({ 
  id, 
  label, 
  icon, 
  value, 
  onChange, 
  onBlur, 
  error, 
  touched,
  ...props 
}: InputFieldProps) => (
  <div className="group transform transition-all duration-200 hover:scale-[1.01]">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 group-hover:text-blue-500 transition-colors duration-200 flex items-center">
      {icon}
      <span className="ml-2">{label}</span>
    </label>
    <input
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      className={`w-full px-4 py-3 rounded-lg border ${
        touched && error
          ? 'border-red-300 dark:border-red-600 focus:ring-red-500'
          : 'border-gray-200 dark:border-gray-600 focus:ring-blue-500 hover:border-blue-300 dark:hover:border-blue-500'
      } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:border-transparent transition-all duration-200 ease-in-out shadow-sm`}
      {...props}
    />
    {touched && error && (
      <div className="text-red-500 text-sm mt-1 animate-fadeIn flex items-center">
        <XMarkIcon className="w-4 h-4 mr-1" />
        {error}
      </div>
    )}
  </div>
);

interface FormValues extends Omit<Activity, 'imageUrl'> {
  imageUrl: string;
}

export default function ActivityForm({ onSubmit, initialValues }: ActivityFormProps) {
  const router = useRouter()
  const [currentTag, setCurrentTag] = useState('');
  
  const defaultValues: FormValues = {
    id: '',
    title: '',
    description: '',
    type: 'COURSE',
    status: 'PENDING',
    startDate: '',
    endDate: '',
    location: '',
    coordinator: '',
    participants: 0,
    tags: [],
    imageUrl: ''
  };

  const formik = useFormik<FormValues>({
    initialValues: initialValues ? {
      ...initialValues,
      imageUrl: initialValues.imageUrl || ''
    } : defaultValues,
    validationSchema: ActivitySchema,
    onSubmit: (values) => {
      onSubmit({
        ...values,
        imageUrl: values.imageUrl || undefined
      });
    },
  });

  const selectedType = formik.values.type;

  const handleAddTag = () => {
    if (currentTag && !formik.values.tags.includes(currentTag)) {
      formik.setFieldValue('tags', [...formik.values.tags, currentTag]);
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    formik.setFieldValue(
      'tags',
      formik.values.tags.filter((t: string) => t !== tag)
    );
  };

  return (
    <div className={`max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transform transition-all duration-300 hover:shadow-2xl border border-gray-100 dark:border-gray-700 relative overflow-hidden`}>
      {/* Gradient header based on activity type */}
      <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${getActivityTypeGradient(selectedType)}`}></div>
      
      <div className="flex items-center space-x-4 mb-8 pb-4 border-b border-gray-200 dark:border-gray-700">
        <div className="text-4xl mr-4" aria-hidden="true">
          {getActivityTypeIcon(selectedType)}
        </div>
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            {initialValues ? 'Editar Atividade' : 'Nova Atividade'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2 font-light">
            Preencha os detalhes da atividade nos campos abaixo
          </p>
        </div>
      </div>
      
      <form onSubmit={formik.handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <InputField 
              id="title" 
              label="Título" 
              icon={<PencilIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />}
              placeholder="Digite o título da atividade" 
              type="text"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.title}
              touched={formik.touched.title}
            />

            <div className="group transform transition-all duration-200 hover:scale-[1.01]">
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 group-hover:text-blue-500 transition-colors duration-200 flex items-center">
                <AcademicCapIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <span className="ml-2">Tipo</span>
              </label>
              <select
                id="type"
                name="type"
                value={formik.values.type}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-4 py-3 rounded-lg border ${
                  formik.touched.type && formik.errors.type
                    ? 'border-red-300 dark:border-red-600 focus:ring-red-500'
                    : 'border-gray-200 dark:border-gray-600 focus:ring-blue-500 hover:border-blue-300 dark:hover:border-blue-500'
                } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:border-transparent transition-all duration-200 ease-in-out shadow-sm`}
              >
                <option value="COURSE">Curso</option>
                <option value="WORKSHOP">Workshop</option>
                <option value="SEMINAR">Seminário</option>
                <option value="RESEARCH">Pesquisa</option>
                <option value="EXTENSION">Extensão</option>
                <option value="OTHER">Outro</option>
              </select>
              {formik.touched.type && formik.errors.type && (
                <div className="text-red-500 text-sm mt-1 animate-fadeIn flex items-center">
                  <XMarkIcon className="w-4 h-4 mr-1" />
                  {formik.errors.type}
                </div>
              )}
            </div>

            <div className="group transform transition-all duration-200 hover:scale-[1.01]">
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 group-hover:text-blue-500 transition-colors duration-200 flex items-center">
                <CheckCircleIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <span className="ml-2">Status</span>
              </label>
              <select
                id="status"
                name="status"
                value={formik.values.status}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-4 py-3 rounded-lg border ${
                  formik.touched.status && formik.errors.status
                    ? 'border-red-300 dark:border-red-600 focus:ring-red-500'
                    : 'border-gray-200 dark:border-gray-600 focus:ring-blue-500 hover:border-blue-300 dark:hover:border-blue-500'
                } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:border-transparent transition-all duration-200 ease-in-out shadow-sm`}
              >
                <option value="PENDING">Pendente</option>
                <option value="IN_PROGRESS">Em Andamento</option>
                <option value="COMPLETED">Concluída</option>
                <option value="CANCELLED">Cancelada</option>
              </select>
              {formik.touched.status && formik.errors.status && (
                <div className="text-red-500 text-sm mt-1 animate-fadeIn flex items-center">
                  <XMarkIcon className="w-4 h-4 mr-1" />
                  {formik.errors.status}
                </div>
              )}
            </div>

            <div className="group transform transition-all duration-200 hover:scale-[1.01]">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 group-hover:text-blue-500 transition-colors duration-200 flex items-center">
                <DocumentTextIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <span className="ml-2">Descrição</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                rows={4}
                className={`w-full px-4 py-3 rounded-lg border ${
                  formik.touched.description && formik.errors.description
                    ? 'border-red-300 dark:border-red-600 focus:ring-red-500'
                    : 'border-gray-200 dark:border-gray-600 focus:ring-blue-500 hover:border-blue-300 dark:hover:border-blue-500'
                } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:border-transparent transition-all duration-200 ease-in-out shadow-sm`}
                placeholder="Descreva os detalhes da atividade"
              />
              {formik.touched.description && formik.errors.description && (
                <div className="text-red-500 text-sm mt-1 animate-fadeIn flex items-center">
                  <XMarkIcon className="w-4 h-4 mr-1" />
                  {formik.errors.description}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <InputField 
                id="startDate" 
                label="Data de Início" 
                icon={<CalendarIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />}
                type="date"
                value={formik.values.startDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.startDate}
                touched={formik.touched.startDate}
              />

              <InputField 
                id="endDate" 
                label="Data de Término" 
                icon={<CalendarIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />}
                type="date"
                value={formik.values.endDate}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.endDate}
                touched={formik.touched.endDate}
              />
            </div>

            <InputField 
              id="location" 
              label="Local" 
              icon={<MapPinIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />}
              placeholder="Ex: Laboratório de Informática 1" 
              type="text"
              value={formik.values.location}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.location}
              touched={formik.touched.location}
            />

            <div className="grid grid-cols-2 gap-4">
              <InputField 
                id="coordinator" 
                label="Coordenador" 
                icon={<UserIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />}
                placeholder="Ex: Prof. João Silva" 
                type="text"
                value={formik.values.coordinator}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.coordinator}
                touched={formik.touched.coordinator}
              />

              <InputField 
                id="participants" 
                label="Participantes" 
                icon={<UserGroupIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />}
                type="number"
                min="1"
                value={formik.values.participants}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.errors.participants}
                touched={formik.touched.participants}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="group transform transition-all duration-200 hover:scale-[1.01]">
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 group-hover:text-blue-500 transition-colors duration-200 flex items-center">
              <TagIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <span className="ml-2">Tags</span>
            </label>
            <div className="flex gap-2 flex-wrap mb-2">
              {formik.values.tags.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 animate-fadeIn"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-2 text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-100 focus:outline-none"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                className={`w-full px-4 py-3 rounded-lg border ${
                  formik.touched.tags && formik.errors.tags
                    ? 'border-red-300 dark:border-red-600 focus:ring-red-500'
                    : 'border-gray-200 dark:border-gray-600 focus:ring-blue-500 hover:border-blue-300 dark:hover:border-blue-500'
                } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:border-transparent transition-all duration-200 ease-in-out shadow-sm`}
                placeholder="Digite uma tag e pressione Enter"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transform transition-all duration-200 hover:scale-[1.02] focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center"
              >
                <PlusIcon className="w-5 h-5 mr-1" />
                Adicionar
              </button>
            </div>
            {formik.touched.tags && formik.errors.tags && (
              <div className="text-red-500 text-sm mt-1 animate-fadeIn flex items-center">
                <XMarkIcon className="w-4 h-4 mr-1" />
                {formik.errors.tags}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-8">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 font-medium flex items-center"
          >
            <XMarkIcon className="w-5 h-5 mr-2" />
            Cancelar
          </button>
          <button
            type="submit"
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-300 text-white font-medium shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-[1.02] focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center"
          >
            <CheckCircleIcon className="w-5 h-5 mr-2" />
            {initialValues ? 'Salvar Alterações' : 'Criar Atividade'}
          </button>
        </div>
      </form>
    </div>
  );
}
