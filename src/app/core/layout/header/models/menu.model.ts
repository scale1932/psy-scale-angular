export interface Menu {
  id: number,
  name: string,
  level: number,
  order: number,
  parentId?: number,
  children?: Menu[]
}
