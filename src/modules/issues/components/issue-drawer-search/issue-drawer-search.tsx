import {Button, Drawer} from '@mui/material';
import {useState} from 'react';
import './issue-drawer-search.scss'
import {IssueSearch} from '@src/modules/issues';
import SearchIcon from '@mui/icons-material/Search';

export const IssueDrawerSearch = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className={'drawer'}>
      <Button variant={'outlined'} onClick={() => setIsOpen(true)}><SearchIcon/></Button>
      <Drawer
        anchor={'bottom'}
        open={isOpen}
        PaperProps={{
          sx: {
            borderRadius: '8px 8px 0 0',
            maxHeight: '100%',
            overflow: 'auto',
            padding: '20px',
          }
        }}
        onClose={() => setIsOpen(false)}
      >
        <IssueSearch/>
      </Drawer>
    </div>
  );
};
