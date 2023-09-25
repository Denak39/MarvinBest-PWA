// import { useParams } from 'react-router-dom';

// import {
//   selectEventById,
//   useGetAdminEventsQuery,
// } from '@app/admin/adminEventsSlice';
// import { useGetAdminRestrictionsQuery } from '@app/admin/adminRestrictionsSlice';
// import { useAppSelector } from '@app/hooks';

import Header from '@components/Header/Header';

import SentenceForm from './components/SentenceForm';

function SentenceFormPage() {
  // useGetAdminEventsQuery();
  // useGetAdminRestrictionsQuery();
  // useGetAdminEventsQuery();

  // const { id } = useParams();

  // const event = useAppSelector((state) => selectEventById(state, id));

  return (
    <div className="admin-events-form-page">
      <Header title="Personnes" />

      <SentenceForm />
    </div>
  );
}

export default SentenceFormPage;
