'use client';

import { useState, useEffect } from 'react';
import Brand from '../brand';
import { 
  PawPrint, Plus, CalendarDays, Users, Syringe, Receipt, Search, 
  FileText, Bug, LogOut, ArrowUpRight, TrendingUp, AlertTriangle, CheckCircle 
} from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Field, Choice, today, money } from '../forms';

type RecordType = any; // simplified for this example

const views = [
  { key: 'appointments', label: 'Appointments', Icon: CalendarDays },
  { key: 'patients', label: 'Patients', Icon: Users },
  { key: 'vaccinations', label: 'Vaccinations', Icon: Syringe },
  { key: 'invoices', label: 'Billing', Icon: Receipt },
  { key: 'medical_records', label: 'Medical Records', Icon: FileText },
  { key: 'deworming', label: 'Deworming', Icon: Bug },
];

export default function Workspace() {
  const [records, setRecords] = useState<RecordType[]>([]);
  const [patients, setPatients] = useState<RecordType[]>([]);
  const [view, setView] = useState('appointments');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<RecordType | null>(null);
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [items, setItems] = useState<any[]>([]);
  const [tax, setTax] = useState(0);
  const [printRecord, setPrintRecord] = useState<RecordType | null>(null);

  useEffect(() => {
    loadData();
    if (view !== 'patients') {
      loadPatients();
    }
  }, [view]);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/records?collection=${view}`);
      if (res.ok) {
        const data = await res.json();
        setRecords(data);
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const loadPatients = async () => {
    try {
      const res = await fetch(`/api/records?collection=patients`);
      if (res.ok) {
        const data = await res.json();
        setPatients(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    
    if (view === 'invoices') {
      data.items = JSON.stringify(items);
      data.tax = tax.toString();
    }

    try {
      const res = await fetch('/api/records', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ collection: view, data, id: editing?.id })
      });
      if (res.ok) {
        setNotice('Saved successfully');
        setModal(false);
        loadData();
      } else {
        setError('Failed to save');
      }
    } catch (e) {
      setError('An error occurred');
    }
    setBusy(false);
    setTimeout(() => { setNotice(''); setError(''); }, 3000);
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch('/api/records', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ collection: view, data: { status }, id })
      });
      loadData();
    } catch (e) {
      console.error(e);
    }
  };

  const logout = async () => {
    await fetch('/api/auth', { method: 'DELETE' });
    window.location.href = '/clinic';
  };

  const filteredRecords = records.filter(r => {
    const matchesSearch = JSON.stringify(r).toLowerCase().includes(search.toLowerCase());
    let matchesFilter = true;
    if (filter !== 'All') {
      if (view === 'appointments') matchesFilter = r.status === filter;
      if (view === 'vaccinations') matchesFilter = filter === 'Due' ? new Date(r.dueDate) <= new Date() : true;
      if (view === 'invoices') matchesFilter = r.status === filter;
      if (view === 'medical_records') matchesFilter = r.type === filter;
      if (view === 'deworming') matchesFilter = filter === 'Due' ? new Date(r.dueDate) <= new Date() : true;
    }
    return matchesSearch && matchesFilter;
  });

  const getPatientName = (id: string) => {
    const p = patients.find(p => p.id === id);
    return p ? `${p.pet} (${p.owner})` : 'Unknown';
  };

  return (
    <div className="min-h-screen bg-[#f6f8fb] text-[#132e51]">
      <header className="suite-head bg-white border-b border-[#e0e6ee] px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Brand size="small" />
          <span className="text-sm font-medium text-[#68768a]">{new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="/" target="_blank" className="text-sm font-medium hover:text-[#c51b78] flex items-center gap-1">View website <ArrowUpRight className="w-4 h-4" /></a>
          <button onClick={logout} className="text-[#68768a] hover:text-red-500 flex items-center gap-1 text-sm font-medium"><LogOut className="w-4 h-4" /> Logout</button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <p className="text-xs font-bold tracking-wider text-[#c51b78] mb-2">A LITTLE ORGANIZATION. MORE TIME FOR CARE.</p>
            <h1 className="text-4xl font-serif font-bold">Your clinic, connected.</h1>
          </div>
          <a href="/book" target="_blank" className="bg-[#132e51] hover:bg-[#1e457a] text-white px-5 py-2.5 rounded-full font-medium transition-colors flex items-center gap-2">
            Appointment request <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        <div className="metrics grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-[#e0e6ee] shadow-sm">
            <p className="text-sm font-medium text-[#68768a] mb-1">Visits Today</p>
            <p className="text-2xl font-bold">{records.filter(r => r.date === today() && r.status !== 'Cancelled').length}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-[#e0e6ee] shadow-sm">
            <p className="text-sm font-medium text-[#68768a] mb-1">Registered Patients</p>
            <p className="text-2xl font-bold">{patients.length}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-[#e0e6ee] shadow-sm">
            <p className="text-sm font-medium text-[#68768a] mb-1">Vaccines Due</p>
            <p className="text-2xl font-bold">{records.filter(r => r.dueDate && r.dueDate <= today()).length}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-[#e0e6ee] shadow-sm">
            <p className="text-sm font-medium text-[#68768a] mb-1">Outstanding Invoices</p>
            <p className="text-2xl font-bold">{money(0)}</p>
          </div>
        </div>

        <Tabs value={view} onValueChange={setView} className="w-full">
          <TabsList className="bg-white border border-[#e0e6ee] p-1 rounded-xl h-auto flex flex-wrap gap-1">
            {views.map(v => (
              <TabsTrigger key={v.key} value={v.key} className="rounded-lg data-[state=active]:bg-[#fceef5] data-[state=active]:text-[#c51b78] py-2.5 px-4 flex items-center gap-2">
                <v.Icon className="w-4 h-4" /> {v.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {(notice || error) && (
          <div className={`p-4 rounded-xl flex items-center gap-2 ${notice ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            {notice ? <CheckCircle className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
            {notice || error}
          </div>
        )}

        <div className="panel bg-white rounded-2xl shadow-sm border border-[#e0e6ee] overflow-hidden">
          <div className="p-4 border-b border-[#e0e6ee] flex flex-col md:flex-row justify-between items-center gap-4 bg-[#f5f8fc]">
            <h2 className="text-lg font-bold flex items-center gap-2"><FileText className="w-5 h-5 text-[#c51b78]" /> {views.find(v => v.key === view)?.label}</h2>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#68768a]" />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  value={search} 
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-full border border-[#e0e6ee] focus:border-[#c51b78] focus:outline-none text-sm"
                />
              </div>
              {view !== 'patients' && (
                <select 
                  value={filter} 
                  onChange={e => setFilter(e.target.value)}
                  className="py-2 px-3 rounded-full border border-[#e0e6ee] focus:border-[#c51b78] focus:outline-none text-sm bg-white"
                >
                  <option value="All">All Status</option>
                  {view === 'appointments' && <><option>Requested</option><option>Confirmed</option><option>Completed</option><option>Cancelled</option></>}
                  {view === 'invoices' && <><option>Unpaid</option><option>Paid</option></>}
                  {view === 'medical_records' && <><option>Consultation</option><option>Surgery</option><option>Lab Result</option><option>X-Ray</option><option>Follow-up</option></>}
                  {(view === 'vaccinations' || view === 'deworming') && <option>Due</option>}
                </select>
              )}
              <button 
                onClick={() => { setEditing(null); setItems([]); setTax(0); setModal(true); }}
                className="bg-[#c51b78] hover:bg-[#a91666] text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-1 whitespace-nowrap"
              >
                <Plus className="w-4 h-4" /> Add
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <div className="p-8 text-center text-[#68768a]">Loading...</div>
            ) : filteredRecords.length === 0 ? (
              <div className="p-12 text-center text-[#68768a]">
                <PawPrint className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p>No records found.</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    {view === 'appointments' && <><TableHead>Visit</TableHead><TableHead>Pet & Parent</TableHead><TableHead>Reason</TableHead><TableHead>Status</TableHead><TableHead>Actions</TableHead></>}
                    {view === 'patients' && <><TableHead>Patient</TableHead><TableHead>Pet Parent</TableHead><TableHead>Phone</TableHead><TableHead>Notes</TableHead><TableHead>Actions</TableHead></>}
                    {view === 'vaccinations' && <><TableHead>Patient</TableHead><TableHead>Vaccine</TableHead><TableHead>Administered</TableHead><TableHead>Next Due</TableHead><TableHead>Actions</TableHead></>}
                    {view === 'invoices' && <><TableHead>Invoice #</TableHead><TableHead>Patient</TableHead><TableHead>Date</TableHead><TableHead>Total (₹)</TableHead><TableHead>Status</TableHead><TableHead>Actions</TableHead></>}
                    {view === 'medical_records' && <><TableHead>Patient</TableHead><TableHead>Type</TableHead><TableHead>Date</TableHead><TableHead>Diagnosis</TableHead><TableHead>Actions</TableHead></>}
                    {view === 'deworming' && <><TableHead>Patient</TableHead><TableHead>Medication</TableHead><TableHead>Administered</TableHead><TableHead>Next Due</TableHead><TableHead>Actions</TableHead></>}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecords.map(r => (
                    <TableRow key={r.id}>
                      {view === 'appointments' && <>
                        <TableCell><span className="font-medium">{r.date}</span><br/><span className="text-sm text-gray-500">{r.time}</span></TableCell>
                        <TableCell><span className="font-medium">{r.pet}</span><br/><span className="text-sm text-gray-500">{r.owner} • {r.phone}</span></TableCell>
                        <TableCell>{r.reason}</TableCell>
                        <TableCell><span className={`px-2 py-1 rounded-full text-xs font-medium ${r.status==='Confirmed'?'bg-blue-100 text-blue-800':r.status==='Completed'?'bg-green-100 text-green-800':r.status==='Cancelled'?'bg-red-100 text-red-800':'bg-yellow-100 text-yellow-800'}`}>{r.status}</span></TableCell>
                        <TableCell className="space-x-2">
                          <button onClick={() => {setEditing(r); setModal(true);}} className="text-blue-600 text-sm">View</button>
                          {r.status === 'Requested' && <button onClick={() => updateStatus(r.id, 'Confirmed')} className="text-green-600 text-sm">Confirm</button>}
                          {r.status === 'Confirmed' && <button onClick={() => updateStatus(r.id, 'Completed')} className="text-green-600 text-sm">Complete</button>}
                        </TableCell>
                      </>}
                      {view === 'patients' && <>
                        <TableCell><span className="font-medium">{r.pet}</span><br/><span className="text-sm text-gray-500">{r.species} • {r.breed}</span></TableCell>
                        <TableCell>{r.owner}</TableCell>
                        <TableCell>{r.phone}</TableCell>
                        <TableCell className="max-w-xs truncate">{r.notes}</TableCell>
                        <TableCell><button onClick={() => {setEditing(r); setModal(true);}} className="text-blue-600 text-sm">Edit</button></TableCell>
                      </>}
                      {view === 'vaccinations' && <>
                        <TableCell>{getPatientName(r.patientId)}</TableCell>
                        <TableCell><span className="font-medium">{r.vaccine}</span><br/><span className="text-sm text-gray-500">Batch: {r.batch}</span></TableCell>
                        <TableCell>{r.givenDate}</TableCell>
                        <TableCell><span className={`px-2 py-1 rounded-full text-xs font-medium ${new Date(r.dueDate) <= new Date() ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>{r.dueDate}</span></TableCell>
                        <TableCell><button onClick={() => {setEditing(r); setModal(true);}} className="text-blue-600 text-sm">Edit</button></TableCell>
                      </>}
                      {view === 'invoices' && <>
                        <TableCell className="font-medium">INV-{r.id.slice(0,6).toUpperCase()}</TableCell>
                        <TableCell>{getPatientName(r.patientId)}</TableCell>
                        <TableCell>{r.date}</TableCell>
                        <TableCell className="font-bold">{money(r.total || 0)}</TableCell>
                        <TableCell><span className={`px-2 py-1 rounded-full text-xs font-medium ${r.status==='Paid'?'bg-green-100 text-green-800':'bg-red-100 text-red-800'}`}>{r.status}</span></TableCell>
                        <TableCell className="space-x-2">
                          <button onClick={() => {setEditing(r); setModal(true);}} className="text-blue-600 text-sm">View</button>
                          <button onClick={() => {setPrintRecord(r); setTimeout(() => window.print(), 100);}} className="text-gray-600 text-sm">Print</button>
                          {r.status === 'Unpaid' && <button onClick={() => updateStatus(r.id, 'Paid')} className="text-green-600 text-sm">Pay</button>}
                        </TableCell>
                      </>}
                      {view === 'medical_records' && <>
                        <TableCell>{getPatientName(r.patientId)}</TableCell>
                        <TableCell><span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">{r.type}</span></TableCell>
                        <TableCell>{r.date}</TableCell>
                        <TableCell className="max-w-xs truncate">{r.diagnosis}</TableCell>
                        <TableCell><button onClick={() => {setEditing(r); setModal(true);}} className="text-blue-600 text-sm">Edit</button></TableCell>
                      </>}
                      {view === 'deworming' && <>
                        <TableCell>{getPatientName(r.patientId)}</TableCell>
                        <TableCell>{r.medication}</TableCell>
                        <TableCell>{r.givenDate}</TableCell>
                        <TableCell><span className={`px-2 py-1 rounded-full text-xs font-medium ${new Date(r.dueDate) <= new Date() ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>{r.dueDate}</span></TableCell>
                        <TableCell><button onClick={() => {setEditing(r); setModal(true);}} className="text-blue-600 text-sm">Edit</button></TableCell>
                      </>}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </main>

      <Dialog open={modal} onOpenChange={setModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogTitle>{editing ? 'Edit' : 'Add'} {views.find(v => v.key === view)?.label.slice(0, -1)}</DialogTitle>
          <DialogDescription>Fill out the details below.</DialogDescription>
          <form onSubmit={handleSave} className="form-grid grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            
            {view === 'patients' && <>
              <Field name="pet" label="Pet Name" type="text" value={editing?.pet} />
              <Field name="owner" label="Owner Name" type="text" value={editing?.owner} />
              <Field name="phone" label="Phone" type="text" value={editing?.phone} />
              <Choice name="species" label="Species" options={[{value:'Dog',label:'Dog'},{value:'Cat',label:'Cat'},{value:'Bird',label:'Bird'},{value:'Other',label:'Other'}]} value={editing?.species} />
              <Field name="breed" label="Breed" type="text" value={editing?.breed} />
              <Field name="age" label="Age (Years/Months)" type="text" value={editing?.age} />
              <Field name="weight" label="Weight (kg)" type="text" value={editing?.weight} />
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">Notes</label>
                <textarea name="notes" defaultValue={editing?.notes} className="w-full border rounded-lg p-2 min-h-[100px]" />
              </div>
            </>}

            {view === 'appointments' && <>
              <Field name="pet" label="Pet Name" type="text" value={editing?.pet} />
              <Field name="owner" label="Owner Name" type="text" value={editing?.owner} />
              <Field name="phone" label="Phone" type="text" value={editing?.phone} />
              <Field name="date" label="Date" type="date" value={editing?.date || today()} />
              <Field name="time" label="Time" type="time" value={editing?.time} />
              <Choice name="status" label="Status" options={[{value:'Requested',label:'Requested'},{value:'Confirmed',label:'Confirmed'},{value:'Completed',label:'Completed'},{value:'Cancelled',label:'Cancelled'}]} value={editing?.status || 'Requested'} />
              <div className="col-span-2">
                <Field name="reason" label="Reason for visit" type="text" value={editing?.reason} />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">Notes</label>
                <textarea name="notes" defaultValue={editing?.notes} className="w-full border rounded-lg p-2 min-h-[100px]" />
              </div>
            </>}

            {(view === 'vaccinations' || view === 'deworming' || view === 'medical_records' || view === 'invoices') && (
              <div className="col-span-2">
                <Choice name="patientId" label="Patient" options={patients.map(p => ({value:p.id, label:`${p.pet} (${p.owner})`}))} value={editing?.patientId} />
              </div>
            )}

            {view === 'vaccinations' && <>
              <Field name="vaccine" label="Vaccine Name" type="text" value={editing?.vaccine} />
              <Field name="batch" label="Batch Number" type="text" value={editing?.batch} />
              <Field name="givenDate" label="Given Date" type="date" value={editing?.givenDate || today()} />
              <Field name="dueDate" label="Next Due Date" type="date" value={editing?.dueDate} />
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">Notes</label>
                <textarea name="notes" defaultValue={editing?.notes} className="w-full border rounded-lg p-2" />
              </div>
            </>}

            {view === 'deworming' && <>
              <Field name="medication" label="Medication Name" type="text" value={editing?.medication} />
              <Field name="weight" label="Current Weight (kg)" type="text" value={editing?.weight} />
              <Field name="givenDate" label="Given Date" type="date" value={editing?.givenDate || today()} />
              <Field name="dueDate" label="Next Due Date" type="date" value={editing?.dueDate} />
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">Notes</label>
                <textarea name="notes" defaultValue={editing?.notes} className="w-full border rounded-lg p-2" />
              </div>
            </>}

            {view === 'medical_records' && <>
              <Choice name="type" label="Record Type" options={[{value:'Consultation',label:'Consultation'},{value:'Surgery',label:'Surgery'},{value:'Lab Result',label:'Lab Result'},{value:'X-Ray',label:'X-Ray'},{value:'Follow-up',label:'Follow-up'}]} value={editing?.type || 'Consultation'} />
              <Field name="date" label="Date" type="date" value={editing?.date || today()} />
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">Diagnosis</label>
                <textarea name="diagnosis" defaultValue={editing?.diagnosis} className="w-full border rounded-lg p-2" />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">Treatment / Notes</label>
                <textarea name="treatment" defaultValue={editing?.treatment} className="w-full border rounded-lg p-2 min-h-[100px]" />
              </div>
            </>}

            {view === 'invoices' && <>
              <Field name="date" label="Date" type="date" value={editing?.date || today()} />
              <Choice name="status" label="Status" options={[{value:'Unpaid',label:'Unpaid'},{value:'Paid',label:'Paid'}]} value={editing?.status || 'Unpaid'} />
              {/* Note: In a full app, you would add an interactive line item builder here */}
              <div className="col-span-2">
                 <p className="text-sm text-gray-500 italic">Invoice line items builder would be implemented here.</p>
              </div>
            </>}

            <div className="col-span-1 md:col-span-2 flex justify-end gap-2 mt-4 pt-4 border-t border-[#e0e6ee]">
              <button type="button" onClick={() => setModal(false)} className="px-4 py-2 border rounded-full font-medium">Cancel</button>
              <button type="submit" disabled={busy} className="px-4 py-2 bg-[#c51b78] hover:bg-[#a91666] text-white rounded-full font-medium disabled:opacity-50 flex items-center gap-2">
                {busy ? 'Saving...' : 'Save Record'}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Print only section */}
      <div className="hidden print:block invoice-paper p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-[#132e51]">The Animal Place</h1>
          <p className="text-gray-600">Srinagar Colony, Yousufguda, Hyderabad</p>
        </div>
        {printRecord && (
          <div>
            <div className="flex justify-between mb-8 border-b pb-4">
              <div>
                <h2 className="font-bold mb-2">Invoice To:</h2>
                <p>{getPatientName(printRecord.patientId)}</p>
              </div>
              <div className="text-right">
                <h2 className="font-bold mb-2">Invoice Details:</h2>
                <p>INV-{printRecord.id?.slice(0,6).toUpperCase()}</p>
                <p>Date: {printRecord.date}</p>
                <p>Status: {printRecord.status}</p>
              </div>
            </div>
            {/* Table of items would go here in print view */}
            <div className="text-right mt-12 text-2xl font-bold">
              Total: {money(printRecord.total || 0)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
