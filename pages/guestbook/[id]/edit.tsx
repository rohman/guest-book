import Link from 'next/link';
import { Button, Form, Loader, Icon } from 'semantic-ui-react';
import fetch from 'isomorphic-unfetch';
import Layout from '../../../components/Layout';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

interface Guest {
    id: Number;
    name: String;
    address: String;
    phoneNumber: Number;
    comment: String;
}

interface ListData {
    lists: Guest | undefined;
}

const EditGuest = ({lists} : ListData) => {
    const [form, setForm] = useState({ name: lists?.name, address: lists?.address, phoneNumber: lists?.phoneNumber, comment: lists?.comment });
    const [isSubmit, setIsSubmit] = useState(false);
    const [errors, setErrors] = useState({ name: '', address: '', phoneNumber: '', comment: '' });
    const router = useRouter();

    useEffect(() => {
        if (isSubmit) {
            // console.log(Object.keys(errors).length);
            if (Object.keys(errors).length === 0) {
                // alert('aaaa');
                createGuestBook();
            } else {
                setIsSubmit(false);
            }
        }
    }, [errors]);

    const createGuestBook = async () => {
        try {
            console.log(JSON.stringify(form));
            const rest = await fetch(process.env.BASE_URI + `/guest/${router.query.id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(form)
            });

            router.push('/');
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        let errs = validation();
        setErrors(errs);
        setIsSubmit(true);
    }

    const handleChange = (e: any) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const validation = () => {
        // console.log(form);
        let error = {};
        if (!form.name) {
            error.name = "Please Input Name";
        }
        if (!form.address) {
            error.address = "Please Input Address";
        }
        if (!form.phoneNumber) {
            error.phoneNumber = "Please Input Phone Number";
        }
        if (!form.comment) {
            error.comment = "Please Input Comment";
        }

        return error;
    }

    return <Layout title="Guest Book">
        <div className="form-container">
            <h1>Edit Guest Book</h1>
            <div>
                {isSubmit ? <Loader active inline="centered" />
                    :
                    <Form onSubmit={handleSubmit}>
                        <Form.Input
                            label="Name"
                            placeholder="name"
                            name="name"
                            onChange={handleChange}
                            error={errors.name ? { content: 'please input name', pointing: 'below' } : null}
                            value={form.name}
                        />
                        <Form.TextArea
                            label="Address"
                            placeholder="address"
                            name="address"
                            onChange={handleChange}
                            error={errors.address ? { content: 'please input address', pointing: 'below' } : null}
                            value={form.address}
                        />
                        <Form.Input
                            label="phoneNumber"
                            placeholder="Phone Number"
                            name="phoneNumber"
                            onChange={handleChange}
                            error={errors.phoneNumber ? { content: 'please input phone number', pointing: 'below' } : null}
                            value={form.phoneNumber}
                        />
                        <Form.TextArea
                            label="Comment"
                            placeholder="comment"
                            name="comment"
                            onChange={handleChange}
                            error={errors.comment ? { content: 'please input comment', pointing: 'below' } : null}
                            value={form.comment}
                        />
                        <Button secondary type="submit"><Icon name="edit" />Update</Button>
                    </Form>
                }
            </div>

        </div>
    </Layout>
}

EditGuest.getInitialProps = async ({ query: {id} }) => {
    const res = await fetch(process.env.BASE_URI + `/guest/${id}`);
    const data: Guest[] | undefined = await res.json();
    return { lists: data };
}

export default EditGuest;