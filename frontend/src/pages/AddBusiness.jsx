import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { businessApi } from '../api/businessApi';
import { categoryApi } from '../api/categoryApi';
import BusinessForm, { getEmptyBusinessForm } from '../components/BusinessForm';
import LoadingSpinner from '../components/LoadingSpinner';
import PageHeader from '../components/PageHeader';
import { validateBusinessForm } from '../utils/validation';

export default function AddBusiness() {
  const navigate = useNavigate();
  const [form, setForm] = useState(getEmptyBusinessForm());
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    categoryApi
      .getAll()
      .then(({ data }) => setCategories(data))
      .catch((err) => toast.error(err.friendlyMessage || 'Failed to load categories'))
      .finally(() => setLoadingCategories(false));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateBusinessForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error('Fadlan sax khaladaadka form-ka!');
      return;
    }

    setLoading(true);
    try {
      await businessApi.create({
        ...form,
        categoryId: Number(form.categoryId),
      });
      toast.success('Ganacsiga si guul leh ayaa loo kaydiyay!');
      navigate('/businesses');
    } catch (err) {
      toast.error(err.friendlyMessage || 'Wuu ku fashilmay inuu kaydiyo ganacsiga');
    } finally {
      setLoading(false);
    }
  };

  if (loadingCategories) return <LoadingSpinner message="Loading form..." />;

  return (
    <div className="mx-auto max-w-3xl space-y-8 text-left">
      <PageHeader
        title="Add Business"
        subtitle="Create a new directory listing"
      />
      <section className="rounded-2xl border border-white/10 bg-slate-900 p-6 lg:p-8 shadow-xl">
        <BusinessForm
          form={form}
          errors={errors}
          categories={categories}
          onChange={handleChange}
          onSubmit={handleSubmit}
          submitLabel="Add Business"
          loading={loading}
        />
      </section>
    </div>
  );
}