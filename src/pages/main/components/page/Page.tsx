import React, {memo} from 'react';
import {changeNameAction, nameAtom} from '_infrastructure/atom/exampleAtom';
import {useAction, useAtom} from '@reatom/react';

const MainPage: React.FC = () => {
    const name = useAtom(nameAtom);
    const handleChangeName = useAction(e => changeNameAction(e.currentTarget.value));

    return (
        <div>
            <div>main page</div>

            <form>
                <label htmlFor="name">Enter your name: </label>
                <input id="name" value={name} onChange={handleChangeName} />
            </form>
        </div>
    );
};

export default memo(MainPage);
