import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  FaDownload,
  FaEnvelope,
  FaGlobe,
  FaMapMarkerAlt,
  FaPhone,
  FaStar,
} from 'react-icons/fa';
import { businessApi } from '../api/businessApi';
import { pdfApi } from '../api/pdfApi';
import { reviewApi } from '../api/reviewApi';
import LoadingSpinner from '../components/LoadingSpinner';
import { fadeUp } from '../utils/motion';

export default function BusinessDetails() {
  const { id } = useParams();
  const [business, setBusiness] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pdfLoading, setPdfLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [bizRes, revRes] = await Promise.all([
          businessApi.getById(id),
          reviewApi.getByBusiness(id),
        ]);
        setBusiness(bizRes.data);
        setReviews(revRes.data);
      } catch (err) {
        toast.error(err.friendlyMessage || 'Business not found');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handlePdf = async () => {
    setPdfLoading(true);
    try {
      await pdfApi.downloadBusiness(id, `${business?.name || 'business'}.pdf`);
      toast.success('PDF downloaded');
    } catch (err) {
      toast.error(err.friendlyMessage || 'Failed to download PDF');
    } finally {
      setPdfLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!business) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold">Business not found</h1>
        <Link to="/businesses" className="btn-primary mt-6">
          Back to directory
        </Link>
      </div>
    );
  }

  const galleryPlaceholders = [1, 2, 3, 4];

  return (
    <motion.div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8" {...fadeUp}>
      <Link to="/businesses" className="text-sm font-semibold text-amber-600 hover:underline">
        ← Back to businesses
      </Link>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="card p-8">
            <div className="flex flex-wrap items-start gap-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-yellow-100 text-3xl font-bold text-amber-700">
                {business.logoUrl ? (
                  <img
                    src={business.logoUrl}
                    alt=""
                    className="h-full w-full rounded-2xl object-cover"
                  />
                ) : (
                  business.name?.charAt(0)
                )}
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-extrabold text-slate-900">{business.name}</h1>
                <span className="mt-2 inline-block rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600">
                  {business.categoryName}
                </span>
                <div className="mt-3 flex items-center gap-2 text-amber-600">
                  <FaStar />
                  <span className="font-bold">{Number(business.rating).toFixed(1)}</span>
                  <span className="text-slate-500">
                    ({business.reviewCount || reviews.length} reviews)
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={handlePdf}
                disabled={pdfLoading}
                className="btn-primary"
              >
                <FaDownload /> {pdfLoading ? 'Downloading…' : 'Download PDF'}
              </button>
            </div>
            {business.description && (
              <p className="mt-6 leading-relaxed text-slate-600">{business.description}</p>
            )}
            <ul className="mt-8 space-y-3 text-slate-700">
              <li className="flex items-center gap-3">
                <FaPhone className="text-amber-500" />
                <a href={`tel:${business.phone}`} className="hover:text-amber-700">
                  {business.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-amber-500" />
                <a href={`mailto:${business.email}`} className="hover:text-amber-700">
                  {business.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="mt-1 text-amber-500" />
                {business.address}, {business.city}
              </li>
              {business.website && (
                <li className="flex items-center gap-3">
                  <FaGlobe className="text-amber-500" />
                  <a
                    href={business.website}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-amber-700"
                  >
                    {business.website}
                  </a>
                </li>
              )}
            </ul>
          </div>

          <div className="card mt-8 p-8">
            <h2 className="text-xl font-bold text-slate-900">Gallery</h2>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {galleryPlaceholders.map((n) => (
                <div
                  key={n}
                  className="flex aspect-square items-center justify-center rounded-xl bg-gradient-to-br from-yellow-50 to-amber-100 text-sm text-slate-500"
                >
                  Photo {n}
                </div>
              ))}
            </div>
          </div>

          <div className="card mt-8 p-8">
            <h2 className="text-xl font-bold text-slate-900">Reviews</h2>
            {reviews.length ? (
              <ul className="mt-6 divide-y divide-slate-100">
                {reviews.map((r) => (
                  <li key={r.id} className="py-5 first:pt-0">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-slate-900">{r.userName}</p>
                      <span className="flex gap-0.5 text-amber-500">
                        {Array.from({ length: r.rating }).map((_, i) => (
                          <FaStar key={i} className="h-3.5 w-3.5" />
                        ))}
                      </span>
                    </div>
                    <p className="mt-2 text-slate-600">{r.comment}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-slate-500">No reviews yet.</p>
            )}
          </div>
        </div>

        <aside className="space-y-6">
          <div className="card p-6">
            <h3 className="font-bold text-slate-900">Contact</h3>
            <a href={`tel:${business.phone}`} className="btn-primary mt-4 w-full justify-center">
              <FaPhone /> Call Now
            </a>
          </div>
          <div className="card flex min-h-[200px] items-center justify-center p-6 text-center text-sm text-slate-500">
            Map placeholder — {business.city}
          </div>
        </aside>
      </div>
    </motion.div>
  );
}
