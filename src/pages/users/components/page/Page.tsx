import React, {FC, memo} from 'react';
import {usersAPI} from '../../api/UsersAPI';

usersAPI.request();

const Page: FC = () => {
    return (
        <div>users</div>
    );
};

export default memo(Page);
