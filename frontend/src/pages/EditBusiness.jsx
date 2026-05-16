import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { businessApi } from '../api/businessApi';
import { categoryApi } from '../api/categoryApi';
import BusinessForm, { getEmptyBusinessForm } from '../components/BusinessForm';
import LoadingSpinner from '../components/LoadingSpinner';
import PageHeader from '../components/PageHeader';
import { validateBusinessForm } from '../utils/validation';

export default function EditBusiness() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(getEmptyBusinessForm());
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [businessRes, categoriesRes] = await Promise.all([
          businessApi.getById(id),
          categoryApi.getAll(),
        ]);
        const b = businessRes.data;
        setForm({
          name: b.name,
          phone: b.phone,
          email: b.email,
          address: b.address,
          description: b.description || '',
          categoryId: String(b.categoryId),
        });
        setCategories(categoriesRes.data);
      } catch (err) {
        toast.error(err.friendlyMessage || 'Failed to load business');
        navigate('/businesses');
      } finally {
        setPageLoading(false);
      }
    };
    load();
  }, [id, navigate]);

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
      toast.error('Please fix the form errors');
      return;
    }

    setLoading(true);
    try {
      await businessApi.update(id, {
        ...form,
        categoryId: Number(form.categoryId),
      });
      toast.success('Business updated successfully!');
      navigate('/businesses');
    } catch (err) {
      toast.error(err.friendlyMessage || 'Failed to update business');
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) return <LoadingSpinner message="Loading business..." />;

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <PageHeader
        title="Edit Business"
        subtitle="Update directory listing"
      />
      <section className="card p-6 lg:p-8">
        <BusinessForm
          form={form}
          errors={errors}
          categories={categories}
          onChange={handleChange}
          onSubmit={handleSubmit}
          submitLabel="Save Changes"
          loading={loading}
        />
      </section>
    </div>
  );
}
