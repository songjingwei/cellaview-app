import expTemplateManager from "@/apis/expTemplate";
import { useEffect, useState } from "react";
import { usePersistStore } from "@/store";
import myToast from "@/components/Toast";
import { ExpTemplateType } from "@/types";

const useGetTemplates = () => {
  const userInfo = usePersistStore((state) => state.userInfo);

  const [templates, setTemplates] = useState<ExpTemplateType[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchExpTemplates = async () => {
    setRefreshing(true);
    const payload = {
      currentUserId: userInfo?.id,
      userId: userInfo?.id,
    };
    try {
      const res = await expTemplateManager.getExpTemplatesByUserId(payload);
      if (res.errCode !== 0) {
        myToast.error(res.errMsg);
      } else {
        const tmp = res.body.map((item: any) => {
          return {
            id: item.id,
            templateName: item.template_name,
            userId: item.user_id,
            holes: JSON.parse(item.holes),
            conf: JSON.parse(item.conf),
            status: item.status,
            createTime: item.create_time,
            lastUpdate: item.last_update,
          };
        });
        setTemplates(tmp);
      }
    } catch (err: any) {
      myToast.error(err as string);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchExpTemplates();
  }, []);

  return {
    templates,
    refreshing,
    fetchExpTemplates,
  };
};

export default useGetTemplates;
