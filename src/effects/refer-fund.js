/**
 * 基金参照 hooks
 */
import { 
    useState, 
    useEffect 
} from 'react';
import axios from '../util/api';

function useReferFund() {
    // fetching 状态
    const [fetching, setFetching] = useState(false);
    // 当前value
    const [value, setValue] = useState();
    // 数据列表
    const [data, setData] = useState([]);

    useEffect(() => {
        async function doFetch() {
            setFetching(true);
            const funds = await axios.get('fund');

            setData(funds);
            setFetching(false);
        }

        doFetch();
    }, []);

    function onValueChanged(key) {
        const selected = data.find((item) => {
            return item.key === key;
        });

        setValue(selected);
    }

    return [fetching, data, value, onValueChanged];
}

export default useReferFund;
