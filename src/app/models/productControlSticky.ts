import * as firebase from 'firebase';

export interface productControlSticky {
    key: string,
    op: string,
    recipe: string,
    recipecode: string,
    quantity: string,
    lote:string,
    dateGen: any,
    dateFab: any,
    dateAcon: any,
    dateLab: any,
    dateEnd:any,
    asig:string,
    state:string,
    priority: string,
    active: boolean,
    area: string,
    description: string,
    genclick: string,
    falt2discardclick: string,
    falt2discarddateclick: any,
    falt2entclick: string,
    falt2entdateclick: any,
    ent2faltclick: string,
    ent2faltdateclick: any,
    ent2proclick: string,
    ent2prodateclick: any,
    pro2salclick: string,
    pro2saldateclick: any,
    sal2cuaclick: string,
    sal2cuadateclick: any,
    cua2completeclick: string,
    cua2completedateclick: any,
    editclick: string,
    editdateclick: any,
    deleteclick: string,
    deletedateclick: any
}