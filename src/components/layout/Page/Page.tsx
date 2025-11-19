import React from 'react';
import styles from './Page.module.scss';

import type ChildrenType from '@/types/ChildrenType';

interface PageProps {
  children: ChildrenType;
}

const Page = ({ children }: PageProps): React.ReactElement => {
  return <div className={styles.Page}>{children}</div>;
};

export default Page;
