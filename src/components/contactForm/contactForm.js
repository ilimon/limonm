import React from 'react'
import { withFormik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import { config, emailjs } from '../../email/email'
import './contactForm.scss'

const ContactForm = ({ isSubmitting, errors, touched }) => (
    <Form className="form">
        <div className="field-group">
            <div className="field-item">
                <Field className={`text-input ${(errors.name && touched.name) ? 'error' : ''}`} type="name" name="name" placeholder="Name*" />
                <p className="error-container">
                    <ErrorMessage name="name" />
                </p>
            </div>
            <div className="field-item">
                <Field className={`text-input ${(errors.email && touched.email) ? 'error' : ''}`} type="email" name="email" placeholder="Email*" />
                <p className="error-container">
                    <ErrorMessage name="email" />
                </p>
            </div>
            <div className="field-item">
                <Field className={`text-area ${(errors.message && touched.message) ? 'error' : ''}`} component="textarea" name="message" placeholder="Message*" />
                <p className="error-container">
                    <ErrorMessage name="message" />
                </p>
            </div>
        </div>
        <button type="submit" className={`button is-primary is-rounded is-medium ${isSubmitting ? 'is-loading' : ''}`}><span>Submit</span></button>
    </Form>
)

const FormikForm = withFormik({
    mapPropsToValues({ name, email, message }) {
        return {
            name: name || '',
            email: email || '',
            message: message || ''
        }
    },
    validationSchema: yup.object().shape({
        name: yup.string().required('name is required'),
        email: yup.string().email().required('email is required'),
        message: yup.string().required('message is required')
    }),
    handleSubmit(values, { setSubmitting, resetForm }) {
        const templateParams = {
            name: values.name,
            email: values.email,
            message: values.message
        }
        emailjs.send(config.serviceID, config.templateID, templateParams, config.userID).then(() => {
            setSubmitting(false)
            resetForm()
        }).catch((error) => {
            console.error('FAILED SENDING CONTACT FORM', error);
            setSubmitting(false)
            resetForm()
        });;

    }
})(ContactForm)

export default FormikForm