export const getUrlParameter = (parameterName: string, queryParams: string) => {
    parameterName = parameterName.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + parameterName + '=([^&#]*)');
    const results = regex.exec(queryParams);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};