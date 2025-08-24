import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'
// import { BookmarkCheck } from 'lucide-react'

const Features = () => {
  return (
    <section className='py-20 px-10' id='features'>
        <div className='text-center'>
            <h1 className='text-5xl font-bold'>Features</h1>
            <p className='text-lg mt-2'>Features that wander wise provides</p>
        </div>

        <div className='mt-10 grid grid-cols-4 gap-6'>
            <Card>
                <CardHeader>
                    {/* <BookmarkCheck /> */}
                    <CardTitle className={"text-center text-lg font-semibold"}>Feature 1</CardTitle>
                </CardHeader>
                <CardContent>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora minus iste deleniti consectetur molestias ipsum explicabo, accusamus tenetur quasi dolorem!
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    {/* <BookmarkCheck /> */}
                    <CardTitle className={"text-center text-lg font-semibold"}>Feature 1</CardTitle>
                </CardHeader>
                <CardContent>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora minus iste deleniti consectetur molestias ipsum explicabo, accusamus tenetur quasi dolorem!
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    {/* <BookmarkCheck /> */}
                    <CardTitle className={"text-center text-lg font-semibold"}>Feature 1</CardTitle>
                </CardHeader>
                <CardContent>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora minus iste deleniti consectetur molestias ipsum explicabo, accusamus tenetur quasi dolorem!
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    {/* <BookmarkCheck /> */}
                    <CardTitle className={"text-center text-lg font-semibold"}>Feature 1</CardTitle>
                </CardHeader>
                <CardContent>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora minus iste deleniti consectetur molestias ipsum explicabo, accusamus tenetur quasi dolorem!
                </CardContent>
            </Card>

        </div>

    </section>
  )
}

export default Features