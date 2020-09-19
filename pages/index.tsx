import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import Layout from '../components/Layout';
import { Confirm, Table, Button, Icon } from 'semantic-ui-react';
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
  lists: Guest[] | undefined;
}

const IndexPage = ({ lists }: ListData) => {
  const [confirm, setConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [id, setId] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (isDeleting) {
      // alert('delete');
      deleteGuest();
    }
  }, [isDeleting]);

  const deleteGuest = async () => {
    try {
      await fetch(process.env.BASE_URI + `/guest/${id}`, {
        method: 'Delete'
      })
      router.reload();
    } catch (error) {
      console.log(error);
    }
  }

  const open = (e:any) => {
    console.log(e.target.value);
    setId(e.target.value);
    setConfirm(true);
  }
  const close = () => setConfirm(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    close();
  }

  return (
    <Layout title="Guest Book">
      <Table padded celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Address</Table.HeaderCell>
            <Table.HeaderCell>Phone Number</Table.HeaderCell>
            <Table.HeaderCell>Comment</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {lists?.map(guest => (
            <Table.Row>
              <Table.Cell>{guest.name}</Table.Cell>
              <Table.Cell>{guest.address}</Table.Cell>
              <Table.Cell>{guest.phoneNumber}</Table.Cell>
              <Table.Cell>{guest.comment}</Table.Cell>
              <Table.Cell>
                <Link href={`guestbook/${guest.id}/edit`}>
                  <Button secondary><Icon name='edit' />Edit</Button>
                </Link>
                <Button color="red" onClick={open} value={guest.id}><Icon name='trash' />Delete </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <Confirm
        open={confirm}
        onCancel={close}
        onConfirm={handleDelete}
      />

    </Layout>
  );
}

IndexPage.getInitialProps = async () => {
  const res = await fetch(process.env.BASE_URI + '/guests');
  const data: Guest[] | undefined = await res.json();
  return { lists: data };
}


export default IndexPage
