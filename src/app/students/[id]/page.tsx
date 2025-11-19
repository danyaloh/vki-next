import Page from '@/components/layout/Page/Page';
import { META_DESCRIPTION, META_TITLE } from '@/constants/meta';
import type { Metadata } from 'next';
import Student from '../../../components/Students/Student';

export const metadata: Metadata = {
  title: `Студент - ${META_TITLE}`,
  description: META_DESCRIPTION,
};

const StudentPage = (): React.ReactElement => (
  <Page>
    <h1>Студент</h1>
    <Student />
  </Page>
);

export default StudentPage;
