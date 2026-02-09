

import React, { useState, useEffect } from 'react';
import { getJobOffers, insertJobOffer, updateJobOffer, deleteJobOffer, JobOffer } from '../services/supabase';
import { Briefcase, X, Plus, MapPin, Clock, DollarSign } from 'lucide-react';
import NavBar_Admin from '../components/NavBar_Admin';

// ...existing code...

const badgeColors = {
  Cucina: 'bg-restaurant-accent/20 text-restaurant-accent',
  Sala: 'bg-white/10 text-white',
  Marketing: 'bg-blue-900/30 text-blue-300',
};

const emptyJob = {
  id: null,
  title: '',
  department: '',
  type: 'Full-time', // default
  location: '',
  description: '',
  salaryAmount: '',
  salaryPeriod: 'mese',
  publishedAt: new Date().toISOString().slice(0, 10),
  roleIcon: '👨‍🍳', // default
};

const translations = {
  it: {
    newOffer: 'Nuova Offerta',
    edit: 'Modifica',
    delete: 'Elimina',
    saveChanges: 'Salva Modifiche',
    createOffer: 'Crea Offerta',
    jobTitle: 'Titolo offerta di lavoro',
    department: 'Mansione',
    contractType: 'Tipologia di contratto',
    location: 'Luogo',
    salary: 'Stipendio',
    salaryMonth: 'mese',
    salaryWeek: 'settimana',
    salaryYear: 'anno',
    salaryHour: 'ora',
    publishDate: 'Data Pubblicazione',
    description: 'Descrizione',
    required: 'richiesto',
    fullTime: 'Full-time',
    partTime: 'Part-time',
    seasonal: 'Stagionale',
    remote: 'Remote',
    jobManagement: 'Gestione Offerte di Lavoro',
  },
  en: {
    newOffer: 'New Offer',
    edit: 'Edit',
    delete: 'Delete',
    saveChanges: 'Save Changes',
    createOffer: 'Create Offer',
    jobTitle: 'Job Title',
    department: 'Department',
    contractType: 'Contract Type',
    location: 'Location',
    salary: 'Salary',
    salaryMonth: 'month',
    salaryWeek: 'week',
    salaryYear: 'year',
    salaryHour: 'hour',
    publishDate: 'Publish Date',
    description: 'Description',
    required: 'required',
    fullTime: 'Full-time',
    partTime: 'Part-time',
    seasonal: 'Seasonal',
    remote: 'Remote',
    jobManagement: 'Job Offer Management',
  },
  fr: {
    newOffer: 'Nouvelle offre',
    edit: 'Modifier',
    delete: 'Supprimer',
    saveChanges: 'Enregistrer les modifications',
    createOffer: 'Créer une offre',
    jobTitle: 'Intitulé du poste',
    department: 'Département',
    contractType: 'Type de contrat',
    location: 'Lieu',
    salary: 'Salaire',
    salaryMonth: 'mois',
    salaryWeek: 'semaine',
    salaryYear: 'an',
    salaryHour: 'heure',
    publishDate: 'Date de publication',
    description: 'Description',
    required: 'requis',
    fullTime: 'Temps plein',
    partTime: 'Temps partiel',
    seasonal: 'Saisonnier',
    remote: 'Télétravail',
    jobManagement: 'Gestion des offres d\'emploi',
  },
  es: {
    newOffer: 'Nueva oferta',
    edit: 'Editar',
    delete: 'Eliminar',
    saveChanges: 'Guardar cambios',
    createOffer: 'Crear oferta',
    jobTitle: 'Título del trabajo',
    department: 'Departamento',
    contractType: 'Tipo de contrato',
    location: 'Ubicación',
    salary: 'Salario',
    salaryMonth: 'mes',
    salaryWeek: 'semana',
    salaryYear: 'año',
    salaryHour: 'hora',
    publishDate: 'Fecha de publicación',
    description: 'Descripción',
    required: 'requerido',
    fullTime: 'Tiempo completo',
    partTime: 'Medio tiempo',
    seasonal: 'Estacional',
    remote: 'Remoto',
    jobManagement: 'Gestión de ofertas de trabajo',
  },
  de: {
    newOffer: 'Neues Angebot',
    edit: 'Bearbeiten',
    delete: 'Löschen',
    saveChanges: 'Änderungen speichern',
    createOffer: 'Angebot erstellen',
    jobTitle: 'Stellenbezeichnung',
    department: 'Abteilung',
    contractType: 'Vertragsart',
    location: 'Ort',
    salary: 'Gehalt',
    salaryMonth: 'Monat',
    salaryWeek: 'Woche',
    salaryYear: 'Jahr',
    salaryHour: 'Stunde',
    publishDate: 'Veröffentlichungsdatum',
    description: 'Beschreibung',
    required: 'erforderlich',
    fullTime: 'Vollzeit',
    partTime: 'Teilzeit',
    seasonal: 'Saisonal',
    remote: 'Remote',
    jobManagement: 'Stellenangebotsverwaltung',
  },
  zh: {
    newOffer: '新职位',
    edit: '编辑',
    delete: '删除',
    saveChanges: '保存更改',
    createOffer: '创建职位',
    jobTitle: '职位名称',
    department: '部门',
    contractType: '合同类型',
    location: '地点',
    salary: '薪资',
    salaryMonth: '月',
    salaryWeek: '周',
    salaryYear: '年',
    salaryHour: '小时',
    publishDate: '发布日期',
    description: '描述',
    required: '必需',
    fullTime: '全职',
    partTime: '兼职',
    seasonal: '季节性',
    remote: '远程',
    jobManagement: '职位管理',
  },
  ar: {
    newOffer: 'عرض جديد',
    edit: 'تعديل',
    delete: 'حذف',
    saveChanges: 'حفظ التغييرات',
    createOffer: 'إنشاء عرض',
    jobTitle: 'عنوان الوظيفة',
    department: 'القسم',
    contractType: 'نوع العقد',
    location: 'الموقع',
    salary: 'الراتب',
    salaryMonth: 'شهر',
    salaryWeek: 'أسبوع',
    salaryYear: 'سنة',
    salaryHour: 'ساعة',
    publishDate: 'تاريخ النشر',
    description: 'الوصف',
    required: 'مطلوب',
    fullTime: 'دوام كامل',
    partTime: 'دوام جزئي',
    seasonal: 'موسمي',
    remote: 'عن بعد',
    jobManagement: 'إدارة عروض العمل',
  },
};

const getLang = () => localStorage.getItem('lang') || 'it';
const t = translations[getLang()] || translations['it'];

const AdminWorkWithUs: React.FC = () => {
  const [jobs, setJobs] = useState<JobOffer[]>([]);
    // Carica offerte da Supabase all'apertura
    useEffect(() => {
      (async () => {
        try {
          const data = await getJobOffers();
          // Mappa i campi del DB ai campi della UI
          setJobs(
            data.map(j => ({
              ...j,
              title: j.Job_Title || '',
              department: j.Mansione || '',
              type: j.Contract_Type || '',
              location: j.Job_Location || '',
              description: j.Job_Description || '',
              salaryAmount: j.Salary_Amount ? String(j.Salary_Amount) : '',
              salaryPeriod: j.Salary_Period || 'mese',
              publishedAt: j.published_at || '',
              roleIcon: j.role_icon || '',
              salary: j.Salary_Amount && j.Salary_Period ? `€${j.Salary_Amount}/${j.Salary_Period}` : '',
              id: j.id, // id reale Supabase
              ...j,
            }))
          );
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error('Errore caricamento offerte di lavoro:', err);
        }
      })();
    }, []);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [form, setForm] = useState(emptyJob);

  const openNewModal = () => {
    setForm({ ...emptyJob, publishedAt: new Date().toISOString().slice(0, 10) });
    setEditingJob(null);
    setModalOpen(true);
  };
  const openEditModal = (job) => {
    // Split salary if present
    let salaryAmount = '', salaryPeriod = 'mese';
    if (job.salary) {
      const match = job.salary.match(/([\d.,]+)/);
      salaryAmount = match ? match[1].replace(',', '.') : '';
      if (job.salary.includes('settimana')) salaryPeriod = 'settimana';
      else if (job.salary.includes('anno')) salaryPeriod = 'anno';
      else salaryPeriod = 'mese';
    }
    setForm({
      ...job,
      salaryAmount,
      salaryPeriod,
    });
    setEditingJob(job.id);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setEditingJob(null);
    setForm(emptyJob);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const jobData: JobOffer = {
      Job_Title: form.title,
      role_icon: form.roleIcon,
      Mansione: form.department,
      Contract_Type: form.type,
      Job_Location: form.location,
      Job_Description: form.description,
      Salary_Amount: form.salaryAmount ? Number(form.salaryAmount) : null,
      Salary_Period: form.salaryPeriod,
      published_at: form.publishedAt,
    };
    try {
      if (editingJob) {
        // Modifica offerta
        const updated = await updateJobOffer(editingJob, jobData);
        setJobs(jobs.map(j => j.id === editingJob ? {
          ...updated,
          title: updated.Job_Title || '',
          department: updated.Mansione || '',
          type: updated.Contract_Type || '',
          location: updated.Job_Location || '',
          description: updated.Job_Description || '',
          salaryAmount: updated.Salary_Amount ? String(updated.Salary_Amount) : '',
          salaryPeriod: updated.Salary_Period || 'mese',
          publishedAt: updated.published_at || '',
          roleIcon: updated.role_icon || '',
          salary: updated.Salary_Amount && updated.Salary_Period ? `€${updated.Salary_Amount}/${updated.Salary_Period}` : '',
            id: updated.id, // id reale Supabase
            ...updated,
          } : j));
      } else {
        // Nuova offerta
        const newJob = await insertJobOffer(jobData);
        setJobs([
          {
            ...newJob,
            title: newJob.Job_Title || '',
            department: newJob.Mansione || '',
            type: newJob.Contract_Type || '',
            location: newJob.Job_Location || '',
            description: newJob.Job_Description || '',
            salaryAmount: newJob.Salary_Amount ? String(newJob.Salary_Amount) : '',
            salaryPeriod: newJob.Salary_Period || 'mese',
            publishedAt: newJob.published_at || '',
            roleIcon: newJob.role_icon || '',
            salary: newJob.Salary_Amount && newJob.Salary_Period ? `€${newJob.Salary_Amount}/${newJob.Salary_Period}` : '',
              id: newJob.id, // id reale Supabase
              ...newJob,
            },
            ...jobs,
          ]);
      }
      closeModal();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Errore salvataggio offerta:', err);
      alert('Errore durante il salvataggio.');
    }
  };
  const handleDelete = async (id) => {
    if (window.confirm('Sei sicuro di voler eliminare questa offerta?')) {
      try {
        await deleteJobOffer(id);
        // Ricarica la lista dal database per garantire che sia aggiornata
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
            salaryPeriod: j.Salary_Period || 'mese',
            publishedAt: j.published_at || '',
            roleIcon: j.role_icon || '',
            salary: j.Salary_Amount && j.Salary_Period ? `€${j.Salary_Amount}/${j.Salary_Period}` : '',
          }))
        );
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Errore eliminazione offerta:', err);
        alert('Errore durante l\'eliminazione.');
      }
    }
  };

  return (
    <>
      <NavBar_Admin />
      <div className="bg-restaurant-dark min-h-screen pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h1 className="text-5xl text-white serif font-bold">{t.jobManagement}</h1>
            <button onClick={openNewModal} className="flex items-center gap-2 bg-restaurant-accent hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl transition-all">
              <Plus size={20} /> {t.newOffer}
            </button>
          </div>
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
                {/* Azioni */}
                <div className="mt-auto flex flex-col gap-2">
                  <button onClick={() => openEditModal(job)} className="w-full bg-white text-restaurant-dark font-bold py-3 rounded-xl transition-all hover:bg-restaurant-accent hover:text-white">{t.edit}</button>
                  <button onClick={() => handleDelete(job.id)} className="w-full bg-transparent border border-red-500 text-red-500 font-bold py-2 rounded-xl transition-all hover:bg-red-600 hover:text-white">{t.delete}</button>
                </div>
              </div>
            ))}
          </div>

          {/* Modal per nuova/modifica offerta */}
          {modalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
              <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg relative animate-in fade-in zoom-in duration-200">
                <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-restaurant-accent transition-colors p-2"><X size={24} /></button>
                <h2 className="text-2xl font-bold mb-6 text-restaurant-dark serif">{editingJob ? t.edit : t.newOffer}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">{t.jobTitle}</label>
                    <div className="flex gap-2 items-center">
                      <select
                        name="roleIcon"
                        value={form.roleIcon || '👨‍🍳'}
                        onChange={handleChange}
                        className="bg-gray-100 border border-restaurant-accent text-2xl rounded-lg px-2 py-2 focus:ring-2 focus:ring-restaurant-accent cursor-pointer"
                        title="Seleziona icona mansione"
                      >
                        <option style={{ fontSize: '1.1rem' }} value="👨‍🍳">👨‍🍳</option>
                        <option style={{ fontSize: '1.1rem' }} value="🍕">🍕</option>
                        <option style={{ fontSize: '1.1rem' }} value="🍽️">🍽️</option>
                        <option style={{ fontSize: '1.1rem' }} value="🍸">🍸</option>
                        <option style={{ fontSize: '1.1rem' }} value="🧼">🧼</option>
                        <option style={{ fontSize: '1.1rem' }} value="🧁">🧁</option>
                        <option style={{ fontSize: '1.1rem' }} value="🍷">🍷</option>
                        <option style={{ fontSize: '1.1rem' }} value="📸">📸</option>
                      </select>
                      <input name="title" value={form.title} onChange={handleChange} required className="w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-3" placeholder={t.jobTitle} />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">{t.department}</label>
                      <input name="department" value={form.department} onChange={handleChange} required className="w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-3" placeholder={t.department} />
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">{t.contractType}</label>
                      <select name="type" value={form.type || 'Full-time'} onChange={handleChange} required className="w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-3">
                        <option value="Full-time">{t.fullTime}</option>
                        <option value="Part-time">{t.partTime}</option>
                        <option value="Stagionale">{t.seasonal}</option>
                        <option value="Remote">{t.remote}</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">{t.location}</label>
                      <input name="location" value={form.location} onChange={handleChange} className="w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-3" placeholder={t.location} />
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">{t.salary}</label>
                      <div className="flex gap-2 items-center">
                        <div className="relative w-2/3">
                          <input
                            name="salaryAmount"
                            type="text"
                            inputMode="decimal"
                            pattern="[0-9]*[.,]?[0-9]*"
                            value={form.salaryAmount}
                            onChange={handleChange}
                            required
                            className="w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-3 pr-8 hide-number-spin"
                            placeholder={t.salary}
                            autoComplete="off"
                          />
                          {form.salaryAmount && (
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold pointer-events-none">€</span>
                          )}
                        </div>
                        <select
                          name="salaryPeriod"
                          value={form.salaryPeriod}
                          onChange={handleChange}
                          className="w-28 bg-gray-100 border border-gray-200 rounded-lg px-2 py-3"
                        >
                          <option value="mese">{t.salaryMonth}</option>
                          <option value="settimana">{t.salaryWeek}</option>
                          <option value="anno">{t.salaryYear}</option>
                          <option value="ora">{t.salaryHour}</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">{t.publishDate}</label>
                    <input name="publishedAt" type="date" value={form.publishedAt} onChange={handleChange} required className="w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-3" placeholder={t.publishDate} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">{t.description}</label>
                    <textarea name="description" value={form.description} onChange={handleChange} required className="w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-3 min-h-[80px]" placeholder={t.description} />
                  </div>
                  <button type="submit" className="w-full bg-restaurant-accent hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-all">{editingJob ? t.saveChanges : t.createOffer}</button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminWorkWithUs;
