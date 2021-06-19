import React, {FC, memo} from 'react';
import {actionsAPI} from '../../api/ActionsAPI';

actionsAPI.request();

const Page: FC = () => {
    return (
        <div>actions</div>
    );
};

export default memo(Page);
