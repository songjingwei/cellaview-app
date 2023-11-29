export interface ResponseType {
  errCode: number;
  errMsg: string;
  body?: any;
}

export interface TimerType {
  durationDay?: number;
  durationHour?: number;
  // minute 拼写错误，但是没办法，项目接手时已经这样写了
  durationMinture?: number;
  interHour?: number;
  interMinture?: number;
}

export type ChannelType = "BF" | "FITC" | "PI";

export interface BoardInfoType {
  boardId: number;
  countX: number;
  countY: number;
  intervalX: number;
  intervalY: number;
  originX: number;
  originY: number;
  product: string;
  sn: string;
  type: string;
}

export interface TemplateConfType {
  boardType: string;
  celltype: string;
  // 算法类型
  countType: string;
  light: ChannelType[];
  scanType: string;
  isTimingTrue: boolean;
  timer: TimerType;
  // 孔板信息
  boardInfo: BoardInfoType;
}

export interface ExpTemplateType {
  id: number;
  templateName: string;
  userId: number;
  holes: string[];
  conf: TemplateConfType;
  status: number;
  createTime: string;
  lastUpdate: string;
}
