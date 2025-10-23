export interface Menu {
  id: number,
  name: string,
  path: string,
  level: number,
  order: number,
  parentId?: number,
  children?: Menu[]
}
