<template>
    <div class="blog-wrapper" :class="{ 'no-user': !user }">
        <div class="blog-content">
            <div>
                <h2 v-if="post.welcomeScreen">{{ post.title }}</h2>
                <h2 v-else>{{ post.title }}</h2>
                <p v-if="post.welcomeScreen">{{ post.blogPost }}</p>
                <p v-else class="content-preview" v-html="post.html"></p>
                <router-link class="link link-light" v-if="post.welcomeScreen" :to="{ name: '' }">Login/Register
                    <font-awesome-icon class="arrow arrow-light" :icon="['fas', 'arrow-right']" /></router-link>
                <router-link class="link" v-else :to="{ name: 'BlogView', params: { blogid: this.post.blogID } }">View the Post
                    <font-awesome-icon class="arrow" :icon="['fas', 'arrow-right']" /></router-link>
            </div>
        </div>
        <div class="blog-photo">
            <img v-if="post.welcomeScreen" :src="require(`@/assets/blogPhotos/${post.photo}.png`)" alt="" />
            <img v-else :src="post.coverPhoto" alt="" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'BlogPost',
    props: ['post'],
    computed: {
        user() {
            return this.$store.state.user
        }
    },
}
</script>

<style lang="scss" scoped>
.blog-wrapper {
    display: flex;
    flex-direction: column;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);

    @media (min-width: 700px) {
        min-height: 650px;
        max-height: 650px;
        flex-direction: row;
    }

    .blog-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        flex: 4;
        order: 2;

        @media (min-width: 800px) {
            flex: 3;
        }

        @media (min-width: 700px) {
            order: 1;
        }

        div {
            max-width: 375px;
            padding: 72px 34px;

            @media (min-width: 700px) {
                padding: 0 24px;
            }

            h2 {
                font-size: 32px;
                font-weight: 400;
                text-transform: uppercase;
                margin-bottom: 24px;

                @media (min-width: 700px) {
                    font-size: 40px;
                }
            }

            p {
                font-size: 15px;
                font-weight: 300;
                line-height: 1.7;
            }

            .content-preview {
                font-size: 13px;
                max-height: 24px;
                width: 250px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .link {
                display: inline-flex;
                align-items: center;
                margin-top: 32px;
                padding-bottom: 4px;
                border-bottom: 1px solid transparent;
                transition: 0.5s ease-in all;

                &:hover {
                    border-bottom-color: #303030;
                }
            }

            .link-light {
                &:hover {
                    border-bottom-color: #fff;
                }
            }
        }
    }

    .blog-photo {
        order: 1;
        flex: 3;

        @media (min-width: 700px) {
            order: 2;
        }

        @media (min-width: 700px) {
            flex: 4;
        }

        img {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    &:nth-child(even) {
        .blog-content {
            order: 2;
        }

        .blog-photo {
            order: 1;
        }
    }
}

.no-user:first-child {
    .blog-content {
        background-color: #303030;
        color: #fff;
    }
}
</style>