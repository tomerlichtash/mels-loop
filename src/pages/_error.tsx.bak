import HttpStatusCode from '../http-status-codes';

function Error({ statusCode }: { statusCode: HttpStatusCode }) {
  return (
    <p>
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : 'An error occurred on client'}
    </p>
  );
}

Error.getServerSideProps = ({
  res,
  err,
}: {
  res: { statusCode: HttpStatusCode };
  err: { statusCode: HttpStatusCode };
}) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
