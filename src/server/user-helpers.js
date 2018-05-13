export const getUserData = ({userId, life}) => ({userId, life});
export const isUser = userId => user => user.userId === userId;
export const isNotUser = userId => user => user.userId !== userId;
