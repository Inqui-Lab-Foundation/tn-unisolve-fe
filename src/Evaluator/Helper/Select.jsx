const Select = ({ list, setValue, placeHolder }) => {
    return (
        <select onChange={(e) => setValue(e.target.value)} className="border rounded-3 px-4 pointer" style={{height:'4rem',outline:'none'}}>
            <option value={''} disabled>{placeHolder}</option>
            {list && list.length > 0 ? (
                list.map((item, i) => (
                    <option key={i} value={item}>
                        {item}
                    </option>
                ))
            ) : (
                <option>No Data found</option>
            )}
        </select>
    );
};

export default Select;
