// Generated by https://quicktype.io

export interface Personal {
    id:           string;
    tipoDoc:      TipoDoc;
    numeroDoc:    string;
    apPaterno?:    string;
    apMaterno?:    string;
    nombre1?:      string;
    nombre2?:      string;
    nombreCompleto?:    string;
    fechaNac:     string;
    fechaIngreso: string;
}

export enum TipoDoc {
    Dni = "DNI",
    Ruc = "RUC",
}