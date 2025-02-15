
export const validateForm = (vaildationSchema: Record<string, { rules: RegExp[]; messages: string[] }>,form: Record<string, string>): { field: string; message: string } | null => {
      for(const field in vaildationSchema) {
          const value = form[field]
          const { rules, messages } = vaildationSchema[field]
  
          for(const rule of rules) {
              if(!rule.test(value)) {
                  return {field, message: messages[rules.indexOf(rule)]}
              }
          }
      }
      
      return null;
}