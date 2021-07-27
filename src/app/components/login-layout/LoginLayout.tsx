import {Button, Card, Form, Input, Layout} from 'antd';
import {useForm} from 'antd/lib/form/Form';
import {AxiosError} from 'axios';
import React, {FC, memo, useCallback, useState} from 'react';
import {createUseStyles} from 'react-jss';
import authServiceApi from '../../../core/infrastructure/AuthServiceAPI';

type LoginModel = {
    login: string;
    password: string;
};

const useStyles = createUseStyles({
    input: {
        marginBottom: '16px'
    },
    layout: {
        height: '100%'
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
});

const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 8}
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 16}
    }
};

const LoginLayout: FC = () => {
    const classes = useStyles();

    const [disabled, setDisabled] = useState(false);

    const [form] = useForm<LoginModel>();

    const handleSubmit = useCallback(() => {
        const {login, password} = form.getFieldsValue();
        setDisabled(true);
        authServiceApi.auth(login, password).catch((error: AxiosError) => {
            const message = error.response?.data.message;
            const errors = message ? [message] : ['Some error'];
            const validationParams = {
                validating: false,
                errors
            };
            form.setFields([
                {...validationParams, name: 'login'},
                {...validationParams, name: 'password'}
            ]);
            setDisabled(false);
        });
    }, [form]);

    return (
        <Layout className={classes.layout}>
            <Layout.Content className={classes.content}>
                <Card title="Admin Panel" style={{width: 300}}>
                    <Form {...formItemLayout} form={form} onFinish={handleSubmit}>
                        <Form.Item
                            hasFeedback
                            className={classes.input}
                            name="login"
                            label="Login:"
                            rules={[{required: true}]}
                        >
                            <Input disabled={disabled} />
                        </Form.Item>
                        <Form.Item
                            hasFeedback
                            className={classes.input}
                            name="password"
                            label="Password:"
                            rules={[{required: true}]}
                        >
                            <Input.Password disabled={disabled} />
                        </Form.Item>
                        <Form.Item wrapperCol={{offset: 8, span: 16}}>
                            <Button htmlType="submit" disabled={disabled}>
                                Sign in
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Layout.Content>
        </Layout>
    );
};

export default memo(LoginLayout);
