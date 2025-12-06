// src/pages/SignInPage.js
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../features/authSlice';

// Validation rules using Yup
const signInSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email is required'),
});

export default function SignInPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="page">
      <h1 className="page-title">Sign In</h1>
      <p className="page-subtitle">
        Please enter your name and campus email to continue.
      </p>

      <div className="form-card">
        <Formik
          initialValues={{ name: '', email: '' }}
          validationSchema={signInSchema}
          onSubmit={(values) => {
            // Fake logged-in user
            const fakeUser = {
              id: 'u1',
              name: values.name,
              email: values.email,
            };

            dispatch(signIn(fakeUser));
            navigate('/');
          }}
        >
          <Form>
            {/* Name field */}
            <div className="form-field">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <Field
                id="name"
                name="name"
                placeholder="Enter your name"
                className="form-input"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="form-error"
              />
            </div>

            {/* Email field */}
            <div className="form-field">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <Field
                id="email"
                name="email"
                placeholder="you@campus.edu"
                className="form-input"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="form-error"
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Sign In
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
