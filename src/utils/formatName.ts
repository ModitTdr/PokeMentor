const formatName = (name: string | null | undefined): string => {
   if (!name) {
      return '';
   }
   return name.charAt(0).toUpperCase() + name.slice(1);
}

export default formatName;