import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { asyncAddThread } from '../states/threads/action';
import Button from '../components/Button';
import FieldInput from '../components/FieldInput';
import Textarea from '../components/Textarea';

export default function FormThread() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [body, setBody] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      dispatch(asyncAddThread({ title, body, category }));
      navigate('/');
    } catch (error) {
      console.error('Error posting thread:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-3xl">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex items-center mb-6">
            <Button
              className="btn-circle btn-ghost mr-4"
              onClick={() => navigate(-1)}
            >
              <FaArrowLeft />
            </Button>
            <h1 className="text-3xl font-bold">Buat Thread Baru</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <FieldInput
                label="Judul"
                type="text"
                placeholder="Masukkan judul thread"
                value={title}
                isRequired={true}
                inputClassName="input input-bordered input-primary w-full"
                labelClassName="label"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="form-control">
              <FieldInput
                label="Kategori"
                type="text"
                placeholder="Masukkan kategori"
                value={category}
                inputClassName="input input-bordered input-primary w-full"
                labelClassName="label"
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-lg font-medium">Isi</span>
              </label>
              <Textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Tulis isi thread di sini..."
                className="textarea textarea-bordered textarea-primary h-40 w-full"
                required={true}
              />
              <div className="label justify-end">
                <span className="label-text-alt">{body.length} karakter</span>
              </div>
            </div>

            <div className="card-actions justify-end pt-4">
              <Button
                type="button"
                className="btn-outline"
                onClick={() => navigate('/')}
              >
                Batal
              </Button>
              <Button
                type="submit"
                className={`btn-primary ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? 'Memposting...' : 'Posting Thread'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
