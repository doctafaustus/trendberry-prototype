export const Card = ({ children, className, ...props }) => {
  return (
    <div 
      className={`bg-white border border-gray-200 rounded-lg shadow ${className}`} 
      {...props}
    >
      {children}
    </div>
  );
};

export const CardContent = ({ children, className, ...props }) => {
  return (
    <div className={`p-4 ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardFooter = ({ children, className, ...props }) => {
  return (
    <div 
      className={`px-4 py-0 bg-gray-50 border-t border-gray-200 rounded-b-lg ${className}`} 
      {...props}
    >
      {children}
    </div>
  );
};