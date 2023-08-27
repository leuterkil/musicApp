const useDate = (date:Date,format:string)=>{
    const options:Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
      };
    
      const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
      return format.replace(/yyyy|MM|dd|HH|mm|ss|zzz/g, match => {
        switch (match) {
          case 'yyyy': return formattedDate.slice(6, 10);
          case 'MM': return formattedDate.slice(0, 2);
          case 'dd': return formattedDate.slice(3, 5);
          case 'HH': return formattedDate.slice(11, 13);
          case 'mm': return formattedDate.slice(14, 16);
          case 'ss': return formattedDate.slice(17, 19);
          case 'zzz': return formattedDate.slice(20);
          default: return match;
        }
      });
} 

export default useDate;