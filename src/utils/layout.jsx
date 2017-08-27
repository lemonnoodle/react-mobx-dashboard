import { notification } from 'antd';
export const formItemLayout = {
    labelCol: {
        xl: { span: 6 },
        lg: { span: 8 },
        md: { span: 8 },
        xs: { span: 24 },
    },
    wrapperCol: {
        xl: { span: 18 },
        lg: { span: 16 },
        md: { span: 16 },
        xs: { span: 24 },
    },
}
export const searchLayout = {
    xl: { span: 6 },
    lg: { span: 8 },
    md: { span: 8 },
    xs: { span: 24 },
}
export const cardResponsive = {
    xl: { span: 4 },
    lg: { span: 8 },
    md: { span: 8 },
    xs: { span: 24 },
}
export const chartResponsive = {
    xl: { span: 8 },
    lg: { span: 8 },
    md: { span: 12 },
    xs: { span: 24 },
}
export const modalFormItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 3 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
    },
};
export const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 14,
            offset: 3,
        },
    },
};
export const openNotificationWithIcon = (type,msg,content,duration) => {
    notification[type]({
        message: msg,
        description: content,
        duration: duration,
    });
};
export const visOptions = {
    layout: {
        hierarchical: {
            sortMethod: "directed",
            direction: "UD",
            nodeSpacing: 220,
            levelSeparation:100,
        }
    },
    interaction: {dragNodes :false},
    physics: {
        enabled: false,
    },
    edges: {
        arrows: {to : true },
    },
}
