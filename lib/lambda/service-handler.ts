export const handler = async (event: any) => {
  const response = `Hello from Lambda! ${JSON.stringify(event)}`;
  console.log(response);
  return {
    body: response,
    statusCode: 200,
  };
}