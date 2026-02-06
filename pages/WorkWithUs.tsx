
import React, { useState, useEffect } from 'react';
import { getJobOffers, JobOffer } from '../services/supabase';
import { Briefcase, MapPin, Clock, DollarSign } from 'lucide-react';

const translations = {
  it: {
    jobManagement: 'Lavora con noi',
    fullTime: 'Full-time',
    partTime: 'Part-time',
    seasonal: 'Stagionale',
    remote: 'Remote',
    salaryMonth: 'mese',
    salaryWeek: 'settimana',
    salaryYear: 'anno',
    salaryHour: 'ora',
  },
  en: {
    jobManagement: 'Work with us',
    fullTime: 'Full-time',
    partTime: 'Part-time',
    seasonal: 'Seasonal',
    remote: 'Remote',
    salaryMonth: 'month',
    salaryWeek: 'week',
    salaryYear: 'year',
    salaryHour: 'hour',
  },
  fr: {
    jobManagement: 'Travaillez avec nous',
    fullTime: 'Temps plein',
    partTime: 'Temps partiel',
    seasonal: 'Saisonnier',
    remote: 'Télétravail',
    salaryMonth: 'mois',
    salaryWeek: 'semaine',
    salaryYear: 'an',
    salaryHour: 'heure',
  },
  es: {
    jobManagement: 'Trabaja con nosotros',
    fullTime: 'Tiempo completo',
    partTime: 'Medio tiempo',
    seasonal: 'Estacional',
    remote: 'Remoto',
    salaryMonth: 'mes',
    salaryWeek: 'semana',
    salaryYear: 'año',
    salaryHour: 'hora',
  },
  de: {
    jobManagement: 'Arbeiten Sie mit uns',
    fullTime: 'Vollzeit',
    partTime: 'Teilzeit',
    seasonal: 'Saisonal',
    remote: 'Remote',
    salaryMonth: 'Monat',
    salaryWeek: 'Woche',
    salaryYear: 'Jahr',
    salaryHour: 'Stunde',
  },
  zh: {
    jobManagement: '与我们合作',
    fullTime: '全职',
    partTime: '兼职',
    seasonal: '季节性',
    remote: '远程',
    salaryMonth: '月',
    salaryWeek: '周',
    salaryYear: '年',
    salaryHour: '小时',
  },
  ar: {
    jobManagement: 'اعمل معنا',
    fullTime: 'دوام كامل',
    partTime: 'دوام جزئي',
    seasonal: 'موسمي',
    remote: 'عن بعد',
    salaryMonth: 'شهر',
    salaryWeek: 'أسبوع',
    salaryYear: 'سنة',
    salaryHour: 'ساعة',
  },
};

const getLang = () => localStorage.getItem('lang') || 'it';
const t = translations[getLang()] || translations['it'];

const WorkWithUs: React.FC = () => {
  const [jobs, setJobs] = useState<JobOffer[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const data = await getJobOffers();
        setJobs(
          data.map(j => ({
            ...j,
            title: j.Job_Title || '',
            department: j.Mansione || '',
            type: j.Contract_Type || '',
            location: j.Job_Location || '',
            description: j.Job_Description || '',
            salaryAmount: j.Salary_Amount ? String(j.Salary_Amount) : '',
            salaryPeriod: j.Salary_Period || t.salaryMonth,
            publishedAt: j.published_at || '',
            roleIcon: j.role_icon || '👨‍🍳',
            salary: j.Salary_Amount && j.Salary_Period ? `€${j.Salary_Amount}/${j.Salary_Period}` : '',
            id: j.id,
            ...j,
          }))
        );
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Errore caricamento offerte di lavoro:', err);
      }
    })();
  }, []);

  return (
    <div className="bg-restaurant-dark min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-5xl text-white serif font-bold mb-12">{t.jobManagement}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {jobs.map(job => (
            <div key={job.id} className="relative bg-white/5 border border-white/10 rounded-2xl shadow-xl flex flex-col p-8 pb-6 min-h-[340px] group hover:shadow-2xl transition-all">
              {/* Icona e badge */}
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-restaurant-accent/20 text-2xl" style={{ color: '#ff6600' }}>
                  {job.roleIcon || '👨‍🍳'}
                </span>
                <span className="text-lg font-bold serif uppercase tracking-widest text-restaurant-accent">{job.department}</span>
              </div>
              {/* Titolo */}
              <h2 className="text-2xl font-bold text-white serif mb-2">{job.title}</h2>
              {/* Dettagli */}
              <div className="mb-2 text-restaurant-subtext text-sm font-semibold">
                <div className="flex gap-4">
                  {/* Tipologia e Località sulla stessa riga */}
                  <span className="flex items-center gap-2 min-w-[110px]">
                    <Briefcase size={18} className="text-restaurant-accent" /> {job.type}
                  </span>
                  {job.location && (
                    <span className="flex items-center gap-2 min-w-[110px]">
                      <MapPin size={18} className="text-restaurant-accent" /> {job.location}
                    </span>
                  )}
                </div>
                <div className="flex gap-4 mt-1">
                  {/* Stipendio e Data pubblicazione sulla stessa riga, allineati con sopra */}
                  <span className="flex items-center gap-2 min-w-[110px] whitespace-nowrap overflow-hidden text-ellipsis">
                    <DollarSign size={18} className="text-restaurant-accent" /> {job.salary}
                  </span>
                  <span className="flex items-center gap-2 min-w-[110px]">
                    <Clock size={18} className="text-restaurant-accent" />
                    {job.publishedAt ? new Date(job.publishedAt).toLocaleDateString('it-IT') : ''}
                  </span>
                </div>
              </div>
              {/* Descrizione */}
              <p className="text-restaurant-subtext mb-6 min-h-[40px]">{job.description}</p>
              {/* Pulsante Candidati */}
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`Salve, mi vorrei candidare alla offerta di lavoro ${job.title}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full mt-4 bg-restaurant-accent hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-all text-center block"
              >
                Candidati
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkWithUs;
