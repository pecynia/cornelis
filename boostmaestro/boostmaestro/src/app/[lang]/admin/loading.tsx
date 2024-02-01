import Container from "@/app/[lang]/components/ui/container";
import { Skeleton } from "@/app/[lang]/components/ui/skeleton";

const Loading = () => {
  return (
    <Container>
      <div className='min-h-[60vh] bg-white rounded-lg shadow-lg p-12 mt-10 mb-10 w-full max-w-4xl mx-auto'>
        {/* Simulate the header */}
        <Skeleton className="h-10 w-3/4 mb-8" />
        
        {/* Simulate the sub-header and Add Event button */}
        <Skeleton className="h-6 w-1/4 mb-4" />
        <Skeleton className="h-10 w-full mb-4" />
        
        {/* Simulate the separator */}
        <Skeleton className="h-1 w-full mb-4" />
        
        {/* Simulate Event Overviews */}
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex h-20 items-center justify-between bg-gray-50 rounded-md px-4">
              <div className="space-y-2">
                <div className="flex flex-row gap-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-10" />

                </div>
                <Skeleton className="h-4 w-[200px]" />
              </div>
              <div className="flex flex-row gap-2">
                <Skeleton className="h-5 w-10" />
                <Skeleton className="h-5 w-10" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  )
}

export default Loading;
