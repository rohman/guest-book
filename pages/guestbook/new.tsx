import Link from 'next/link';
import { Button, Form, Loader, Icon } from 'semantic-ui-react';
import fetch from 'isomorphic-unfetch';
import Layout from '../../components/Layout';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const NewGuest = () => {
    const [form, setForm] = useState({ name: '', address: '', phoneNumber: '', comment: '' });
    const [isSubmit, setIsSubmit] = useState(false);
    const [errors, setErrors] = useState({name: '', address: '', phoneNumber: '', comment: '' });
    const router = useRouter();

    useEffect(() =>{
        if(isSubmit){
            // console.log(Object.keys(errors).length);
            if(Object.keys(errors).length === 0){
                // alert('aaaa');
                createGuestBook();
            }else{
                setIsSubmit(false);
            }
        }
    },[errors]);

    const createGuestBook = async () => {
        try {
            console.log(JSON.stringify(form));
            const rest = await fetch(process.env.BASE_URI+'/guest/new',{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-type' : 'application/json'
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

    const handleChange = (e:any) => {
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
            <h1>Create Guest Book</h1>
            <div>
                {isSubmit ? <Loader active inline="centered" />
                    :
                    <Form onSubmit={handleSubmit}>
                        <Form.Input
                            label="Name"
                            placeholder="name"
                            name="name"
                            onChange={handleChange}
                            error={errors.name ? {content: 'please input name',  pointing:'below'} : null}
                        />
                        <Form.TextArea
                            label="Address"
                            placeholder="address"
                            name="address"
                            onChange={handleChange}
                            error={errors.address ? {content: 'please input address', pointing:'below'} : null}
                        />
                        <Form.Input
                            label="phoneNumber"
                            placeholder="Phone Number"
                            name="phoneNumber"
                            onChange={handleChange}
                            error={errors.phoneNumber ? {content: 'please input phone number',  pointing:'below'} : null}
                        />
                        <Form.TextArea
                            label="Comment"
                            placeholder="comment"
                            name="comment"
                            onChange={handleChange}
                            error={errors.comment ? {content: 'please input comment',  pointing:'below'} : null}
                        />
                        <Button primary type="submit"><Icon name="save" />Submit</Button>
                    </Form>
                }
            </div>

        </div>
    </Layout>
}

export default NewGuest;