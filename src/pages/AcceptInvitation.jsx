import useApi from '@/hooks/useApi';
import { useParams,useSearchParams,useNavigate } from 'react-router-dom'
//yo page ma mail accept hune bitikai website ma jaos vana lai 
import Loading from '@/components/shared/Loading';
const AcceptInvitation = () => {
 //trip paxi ko id get garo url bata
 const navigate=useNavigate();
    const {id}=useParams();
    const [searchParams]=useSearchParams();
    const token=searchParams.get("token");//token get garo url bata
    //api call garo backend ma token pathauna
    const {data,error,loading}=useApi(`/trips/${id}/invite/accept?token=${token}`);//back req send 
    if(loading) return <Loading />
    if (data?.message=="Invitation accepted") {
        navigate('/trips/${id}');
    }
    return(
    
    <div>Acceptinvitation</div>
  )
}
export default AcceptInvitation
