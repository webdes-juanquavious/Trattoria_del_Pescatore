import React from 'react';
import { Language } from '../App';

interface WorkWithUsProps {
  lang: Language;
}

const jobsByLang = {
  it: [
    { title: 'Pizzaiolo per stagione estiva', type: 'Stagionale', location: 'Benevento' },
    { title: 'Cameriere a tempo pieno', type: 'Full-time', location: 'Benevento' },
    { title: 'Cameriere per stagione estiva', type: 'Stagionale', location: 'Benevento' },
    { title: 'Lavapiatti', type: 'Part-time', location: 'Benevento' },
    { title: 'Social manager', type: 'Part-time', location: 'Remoto' },
  ],
  en: [
    { title: 'Pizza Chef (Summer)', type: 'Seasonal', location: 'Benevento' },
    { title: 'Full-time Waiter', type: 'Full-time', location: 'Benevento' },
    { title: 'Waiter (Summer)', type: 'Seasonal', location: 'Benevento' },
    { title: 'Dishwasher', type: 'Part-time', location: 'Benevento' },
    { title: 'Social Manager', type: 'Part-time', location: 'Remote' },
  ],
  fr: [
    { title: 'Pizzaiolo saisonnier', type: 'Saisonnier', location: 'Benevento' },
    { title: 'Serveur à temps plein', type: 'Temps plein', location: 'Benevento' },
    { title: 'Serveur saisonnier', type: 'Saisonnier', location: 'Benevento' },
    { title: 'Plongeur', type: 'Temps partiel', location: 'Benevento' },
    { title: 'Social manager', type: 'Temps partiel', location: 'Télétravail' },
  ],
  es: [
    { title: 'Pizzero para temporada de verano', type: 'Temporal', location: 'Benevento' },
    { title: 'Camarero a tiempo completo', type: 'Tiempo completo', location: 'Benevento' },
    { title: 'Camarero para temporada de verano', type: 'Temporal', location: 'Benevento' },
    { title: 'Lavaplatos', type: 'Medio tiempo', location: 'Benevento' },
    { title: 'Social manager', type: 'Medio tiempo', location: 'Remoto' },
  ],
  de: [
    { title: 'Pizzabäcker für Sommersaison', type: 'Saisonal', location: 'Benevento' },
    { title: 'Vollzeitkellner', type: 'Vollzeit', location: 'Benevento' },
    { title: 'Kellner für Sommersaison', type: 'Saisonal', location: 'Benevento' },
    { title: 'Spüler', type: 'Teilzeit', location: 'Benevento' },
    { title: 'Social Manager', type: 'Teilzeit', location: 'Remote' },
  ],
  zh: [
    { title: '夏季比萨师傅', type: '季节性', location: '贝内文托' },
    { title: '全职服务员', type: '全职', location: '贝内文托' },
    { title: '夏季服务员', type: '季节性', location: '贝内文托' },
    { title: '洗碗工', type: '兼职', location: '贝内文托' },
    { title: '社交经理', type: '兼职', location: '远程' },
  ],
  ar: [
    { title: 'طاهي بيتزا للموسم الصيفي', type: 'موسمي', location: 'بينيفينتو' },
    { title: 'نادل بدوام كامل', type: 'دوام كامل', location: 'بينيفينتو' },
    { title: 'نادل للموسم الصيفي', type: 'موسمي', location: 'بينيفينتو' },
    { title: 'غسال صحون', type: 'دوام جزئي', location: 'بينيفينتو' },
    { title: 'مدير وسائل التواصل', type: 'دوام جزئي', location: 'عن بعد' },
  ]
};

const filterOptionsByLang = {
  it: [
    { value: '', label: 'Tutte le posizioni' },
    { value: 'Stagionale', label: 'Stagionale' },
    { value: 'Full-time', label: 'Full-time' },
    { value: 'Part-time', label: 'Part-time' },
    { value: 'Benevento', label: 'Benevento' },
    { value: 'Remoto', label: 'Remoto' },
  ],
  en: [
    { value: '', label: 'All positions' },
    { value: 'Seasonal', label: 'Seasonal' },
    { value: 'Full-time', label: 'Full-time' },
    { value: 'Part-time', label: 'Part-time' },
    { value: 'Benevento', label: 'Benevento' },
    { value: 'Remote', label: 'Remote' },
  ],
  fr: [
    { value: '', label: 'Tous les postes' },
    { value: 'Saisonnier', label: 'Saisonnier' },
    { value: 'Temps plein', label: 'Temps plein' },
    { value: 'Temps partiel', label: 'Temps partiel' },
    { value: 'Benevento', label: 'Benevento' },
    { value: 'Télétravail', label: 'Télétravail' },
  ],
  es: [
    { value: '', label: 'Todos los puestos' },
    { value: 'Temporal', label: 'Temporal' },
    { value: 'Tiempo completo', label: 'Tiempo completo' },
    { value: 'Medio tiempo', label: 'Medio tiempo' },
    { value: 'Benevento', label: 'Benevento' },
    { value: 'Remoto', label: 'Remoto' },
  ],
  de: [
    { value: '', label: 'Alle Positionen' },
    { value: 'Saisonal', label: 'Saisonal' },
    { value: 'Vollzeit', label: 'Vollzeit' },
    { value: 'Teilzeit', label: 'Teilzeit' },
    { value: 'Benevento', label: 'Benevento' },
    { value: 'Remote', label: 'Remote' },
  ],
  zh: [
    { value: '', label: '所有职位' },
    { value: '季节性', label: '季节性' },
    { value: '全职', label: '全职' },
    { value: '兼职', label: '兼职' },
    { value: '贝内文托', label: '贝内文托' },
    { value: '远程', label: '远程' },
  ],
  ar: [
    { value: '', label: 'جميع الوظائف' },
    { value: 'موسمي', label: 'موسمي' },
    { value: 'دوام كامل', label: 'دوام كامل' },
    { value: 'دوام جزئي', label: 'دوام جزئي' },
    { value: 'بينيفينتو', label: 'بينيفينتو' },
    { value: 'عن بعد', label: 'عن بعد' },
  ]
};

const titlesByLang = {
  it: 'Lavora con noi',
  en: 'Work with us',
  fr: 'Travaillez avec nous',
  es: 'Trabaja con nosotros',
  de: 'Arbeiten Sie mit uns',
  zh: '与我们合作',
  ar: 'اعمل معنا'
};

const WorkWithUs: React.FC<WorkWithUsProps> = ({ lang }) => {
  const jobs = jobsByLang[lang] || jobsByLang['it'];
  const filterOptions = filterOptionsByLang[lang] || filterOptionsByLang['it'];
  const [filter, setFilter] = React.useState('');
  const filteredJobs = filter ? jobs.filter(j => j.type === filter || j.location === filter) : jobs;

  return (
    <div className="pt-32 pb-20 bg-restaurant-dark min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-6xl text-white serif text-center mb-12">{titlesByLang[lang] || titlesByLang['it']}</h1>
        <div className="mb-8 flex justify-center">
          <select value={filter} onChange={e => setFilter(e.target.value)} className="px-4 py-2 rounded">
            {filterOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <ul className="space-y-6">
          {filteredJobs.map((job, idx) => (
            <li key={idx} className="bg-white/5 p-6 rounded-xl text-white flex justify-between items-center">
              <span className="font-bold text-lg">{job.title}</span>
              <span className="text-restaurant-accent font-semibold">{job.type} - {job.location}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WorkWithUs;
