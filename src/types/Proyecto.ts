export interface TagsType {
  id: number;
  Tag: string;
}

export interface ProyectoResumen {
  Sistema: string;
  Logo: string;
  Descripcion: string;
  id: number;
  fecha_registro: string;
  detalle_tags: TagsType[];
}
