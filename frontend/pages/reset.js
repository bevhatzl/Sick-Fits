import RequestReset from "../components/RequestReset";
import Reset from "../components/Reset";

export default function ResetPage({ query }) {
    // If there is no query or there is no query.token...(note the ? after query for this logic)
    if(!query?.token) {
      return (
        <div>
          <p>Sorry you must supply a token</p>
          <RequestReset />
        </div>
      );
    }
    return (
    <div>
      <p>RESET YOUR PASSWORD {query.token}</p>
      <Reset token={query.token}/>
    </div>
  );
}