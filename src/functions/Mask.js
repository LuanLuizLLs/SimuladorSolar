const Mask = {
    Cep: (e) => {
        let value = e.target.value;
        value = value.replace(/\D/g, '');
        value = value.replace(/^(\d{5})(\d)/, '$1-$2');
        e.target.maxLength = 9;
        e.target.value = value;
        return e;
    },
    Real: (e) => {
        let value = e.target.value;
        value = value.replace(/\D/g, '');
        value = value.replace(/(\d)(\d{2})$/, '$1,$2');
        value = value.replace(/(?=(\d{3})+(\D))\B/g, '.');
        e.target.value = value;
        return e;
    }
}
export default Mask;