import { collection, getAggregateFromServer, count , average, query, where } from "firebase/firestore"
import { db } from "../firebase/config";
import { useEffect, useState } from "react";

const Aside = () => {
  const tweetCol = collection(db, "tweets");
   const [data, setData] = useState(null);

  // Firestore'dan istatistiksel verileri almak için kullanılır
  // 1) Koleksiyon referansı ister 
  // 2) sum / average / count yardımıyla rapor adımları belirleme
  useEffect(() => {
    getAggregateFromServer(tweetCol, {
      tweetsCount: count(),
    }).then((data) => setData(data._data));
  }, []);

  console.log(data);

   return (
    <div className="max-lg:hidden">
      <p className="my-5 text-align-center p-3 text-lg">
        Toplam Tweet Sayısı: {data?.tweetsCount?.integerValue}
      </p>
    </div>
  );
};

export default Aside
